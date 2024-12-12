import os.path
import numpy as np
from ultralytics import YOLO
import supervision as sv
import pickle
from ..utils import get_bbox_width, get_center_of_bbox
import sys
import cv2


def calculate_center(bbox):
    """Calculate the center point of a bounding box."""
    x, y, w, h = bbox
    center_x = x + w / 2
    center_y = y + h / 2
    return (center_x, center_y)


def calculate_distance(center1, center2):
    """Calculate Euclidean distance between two points."""
    return np.sqrt((center1[0] - center2[0]) ** 2 + (center1[1] - center2[1]) ** 2)


class Tracker:
    def __init__(self, model_path):
        self.model = YOLO(model_path)
        self.tracker = sv.ByteTrack()

    def detect_frames(self, frames):
        batch_size = 24
        detection = []
        for i in range(0, len(frames), batch_size):
            detections_batch = self.model.predict(
                frames[i:i+batch_size], conf=0.1)
            detection += detections_batch
        return detection

    def get_object_tracks(self, frames, read_from_stub=False, stub_path=None):

        # if read_from_stub and stub_path is not None and os.path.exists(stub_path):
        #     with open(stub_path, 'rb') as f:
        #         tracks = pickle.load(f)
        #         return tracks
        # else:
        #     print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        #     print("PATH NOT FOUND")
        #     print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        detections = self.detect_frames(frames)
        tracks = {
            "vehicle": [],
            "waste": []

        }

        distances = {}
        for frame_num, detection in enumerate(detections):
            cls_names = detection.names
            cls_names_inv = {v: k for k, v in cls_names.items()}

            # Convert to supervision Detection Format
            detection_supervision = sv.Detections.from_ultralytics(detection)

            # Track Object
            detection_with_tracks = self.tracker.update_with_detections(
                detection_supervision)
            tracks["vehicle"].append({})
            tracks["waste"].append({})

            vehicle_bboxes = {}
            waste_bboxes = {}

            for frame_detection in detection_with_tracks:
                bbox = frame_detection[0].tolist()
                cls_id = frame_detection[3]
                track_id = frame_detection[4]

                if cls_id == cls_names_inv['vehicle']:
                    tracks["vehicle"][frame_num][track_id] = {"bbox": bbox}
                    # Store vehicle bboxes for distance calculation
                    vehicle_bboxes[track_id] = bbox

                if cls_id == cls_names_inv['waste']:
                    tracks["waste"][frame_num][track_id] = {"bbox": bbox}
                    # Store waste bboxes for distance calculation
                    waste_bboxes[track_id] = bbox

            # Calculate distances between waste and all vehicles in the current frame
            for waste_id, waste_bbox in waste_bboxes.items():
                waste_center = calculate_center(waste_bbox)
                for vehicle_id, vehicle_bbox in vehicle_bboxes.items():
                    vehicle_center = calculate_center(vehicle_bbox)
                    distance = calculate_distance(waste_center, vehicle_center)

                    # Store distances for each waste-vehicle pair
                    if waste_id not in distances:
                        distances[waste_id] = {}

                    if vehicle_id not in distances[waste_id]:
                        distances[waste_id][vehicle_id] = []

                    distances[waste_id][vehicle_id].append(distance)

        # Calculate the mean distance for each waste-vehicle pair
        result = {}
        for waste_id, vehicle_distances in distances.items():
            mean_distances = {vehicle_id: np.mean(
                dist_list) for vehicle_id, dist_list in vehicle_distances.items()}
            print("Mean Distance: ", mean_distances)
            closest_vehicle_id = min(mean_distances, key=mean_distances.get)
            result[waste_id] = closest_vehicle_id

        if stub_path is not None:
            with open(stub_path, 'wb') as f:
                pickle.dump(tracks, f)

        print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        print(result)
        print(type(result))
        print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        return tracks, result

    def draw_rectangle(self, frame, bbox, color, track_id=None):
        x1, y1, x2, y2 = map(int, bbox)
        frame = cv2.rectangle(frame, (x1, y1), (x2, y2), color, thickness=2)
        if track_id is not None:
            cv2.putText(frame, str(track_id), (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
        return frame

    def draw_annotations(self, video_frames, tracks):
        output_video_frames = []
        for frame_num, frame in enumerate(video_frames):
            frame = frame.copy()
            vehicle_dict = tracks["vehicle"][frame_num]
            waste_dict = tracks["waste"][frame_num]

            # draw vehicle
            for track_id, vehicle in vehicle_dict.items():
                frame = self.draw_rectangle(
                    frame, vehicle["bbox"], (0, 0, 255), track_id)

            # Draw waste
            for track_id, waste in waste_dict.items():
                frame = self.draw_rectangle(
                    frame, waste["bbox"], (0, 255, 0), track_id)

            output_video_frames.append(frame)
        return output_video_frames

    def get_frames_with_vehicle_and_waste(self, video_frames, tracks):
        """Return frames where both vehicle and waste are detected."""
        frames_with_both = []
        for frame_num, frame in enumerate(video_frames):
            vehicle_dict = tracks["vehicle"][frame_num]
            waste_dict = tracks["waste"][frame_num]
            """""""""
            # draw vehicle
            for track_id, vehicle in vehicle_dict.items():
                frame = self.draw_rectangle(frame,vehicle["bbox"],(0,0,255), track_id)

            #Draw waste
            for track_id, waste in waste_dict.items():
                frame= self.draw_rectangle(frame,waste["bbox"],(0,255,0),'waste')
            """""""""
            # Check if both vehicle and waste are detected in this frame
            if vehicle_dict and waste_dict:
                frames_with_both.append(frame)  # Store a copy of the frame

        return frames_with_both

    def get_vehicle_frames(self, track_id, frames):
        """
        Finds the frame where the vehicle with the given track ID is detected and returns:
        1. The original frame with the vehicle detected.
        2. The cropped frame containing only the vehicle's bounding box.

        Args:
        - track_id (int): The track ID of the vehicle to look for.
        - frames (list): A list of frames (images).
        - tracks (dict): A dictionary containing the tracking information.

        Returns:
        - original_frame (numpy array): The frame where the vehicle is detected.
        - cropped_frame (numpy array): The cropped frame containing only the vehicle's bounding box.
        """
        read_from_stub = False,
        stub_path = 'stubs/track_stubs.pkl'

        if os.path.exists(stub_path):
            with open(stub_path, 'rb') as f:
                tracks = pickle.load(f)
        else:
            return "No tracks found"

        for frame_num, frame in enumerate(frames):
            # Check if the current frame contains the vehicle with the given track ID
            if track_id in tracks["vehicle"][frame_num] and len(tracks["waste"][frame_num]) > 0:
                # Get the bounding box of the vehicle
                vehicle_bbox = tracks["vehicle"][frame_num][track_id]["bbox"]
                print("Vehicle Box: ", vehicle_bbox)
                # Cast to integers to avoid errors
                x_min, y_min, x_max, y_max = map(int, vehicle_bbox)

                # Calculate width and height based on the max and min values
                w = x_max - x_min
                h = y_max - y_min

                # Ensure bounding box is within frame dimensions (Sanity Check)
                height, width, _ = frame.shape  # Get frame dimensions

                # Ensure x_min is within frame width
                x_min = max(0, min(x_min, width))
                # Ensure y_min is within frame height
                y_min = max(0, min(y_min, height))
                # Ensure width does not exceed frame width
                w = min(w, width - x_min)
                # Ensure height does not exceed frame height
                h = min(h, height - y_min)

                # Crop the region of the frame that contains the vehicle's bounding box
                cropped_vehicle_frame = frame[y_min:y_min + h, x_min:x_min + w]
                # Return the original frame and the cropped vehicle frame
                return frame, cropped_vehicle_frame

        # If no frame is found with the given track_id, return None
        return None, None
