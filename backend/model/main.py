import os
import shutil
from flask import config
from model.utils import read_video, save_video
from model.trackers import Tracker
import cv2
import numpy as np
from ultralytics import YOLO
import matplotlib.pyplot as plt
from .yolo_inferance import license_Extract
from .ocr import Ocr_reader
from moviepy.editor import VideoFileClip


def show_image(img, title="Image", save=True):
    # Convert the BGR image (used by OpenCV) to RGB for matplotlib
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    plt.imshow(img_rgb)
    plt.title(title)
    plt.axis('off')  # Hide axis
    plt.show()
    if (save == True):   # It saves the full frame
        cv2.imwrite('saved_images/Frame.jpg', img,
                    [cv2.IMWRITE_JPEG_QUALITY, 90])
    else:    # It saves the cropped frame of the car
        cv2.imwrite('saved_images/cropped.jpg', img,
                    [cv2.IMWRITE_JPEG_QUALITY, 90])
    print("Image saved")


def main():
    # read Video
    video_frames = read_video("input_videos/video 1.mp4")

    # initialize Tracker
    tracker = Tracker('model_weights/best 4.pt')
    tracks, res = tracker.get_object_tracks(
        video_frames, read_from_stub=True, stub_path='stubs/track_stubs.pkl')
    # print("Vehicle Track Id: ",res)

    vehicle_track_id = list(res.values())[0]
    print("Vehicle Track Id: ", vehicle_track_id)

    # Draw Object Tracks
    out_video_frames = tracker.draw_annotations(video_frames, tracks)

    # new_frames = tracker.get_frames_with_vehicle_and_waste(video_frames, tracks)
    # save_video(new_frames, "output_video/croped video.avi")
    # save video
    save_video(out_video_frames, "output_video/output_video_7.avi")
    original_frame, cropped_frame = tracker.get_vehicle_frames(
        track_id=vehicle_track_id, frames=out_video_frames)
    # Display the original and cropped frames using matplotlib
    if original_frame is not None and cropped_frame is not None:
        show_image(original_frame, title="Original Frame", save=True)
        show_image(cropped_frame, title="Cropped Vehicle", save=False)
    else:
        print(f"Track ID {vehicle_track_id} not found in any frames.")

    # Frame that has the cropped licenseImage
    license_plate = license_Extract('saved_images/cropped.jpg')

    cv2.imwrite('saved_images/license.jpg', license_plate,
                [cv2.IMWRITE_JPEG_QUALITY, 90])

    # Save the License Number of the car
    license_number = Ocr_reader('saved_images/license.jpg')
    print("License Plate:", license_number)


def convert_avi_to_mp4(input_avi_path, output_mp4_path):
    # Load the AVI video file
    clip = VideoFileClip(input_avi_path)

    # Write the result to a new MP4 file
    clip.write_videofile(output_mp4_path, codec='libx264')


def copy_file(src_path, dst_path):
    try:
        # Ensure the destination directory exists
        os.makedirs(os.path.dirname(dst_path), exist_ok=True)

        # Copy the file
        shutil.copy(src_path, dst_path)
        print(f"File copied from {src_path} to {dst_path}")
    except Exception as e:
        print(f"Error occurred while copying the file: {e}")


def Process_video(video_path):
    video_frames = read_video(video_path)

    # initialize Tracker
    tracker = Tracker('model_weights/best4.pt')
    tracks, res = tracker.get_object_tracks(
        video_frames, read_from_stub=True, stub_path='stubs/track_stubs.pkl')
    vehicle_track_id = list(res.values())[0]
    print("Vehicle Track Id: ", vehicle_track_id)

    # Draw Object Tracks
    out_video_frames = tracker.draw_annotations(video_frames, tracks)

    save_video(out_video_frames, "output_video/output_video_avi.avi")
    convert_avi_to_mp4("output_video/output_video_avi.avi",
                       "output_video/output.mp4")

    original_frame, cropped_frame = tracker.get_vehicle_frames(
        track_id=vehicle_track_id, frames=out_video_frames)

    output_video_path = "output_video/output.mp4"
    cropped_frame_path = "saved_images/cropped.jpg"

    if original_frame is not None and cropped_frame is not None:
        show_image(original_frame, title="Original Frame", save=True)
        show_image(cropped_frame, title="Cropped Vehicle", save=False)
    else:
        print(f"Track ID {vehicle_track_id} not found in any frames.")

    # Frame that has the cropped licenseImage
    license_plate = license_Extract("saved_images/cropped.jpg")

    cv2.imwrite(cropped_frame_path, license_plate,
                [cv2.IMWRITE_JPEG_QUALITY, 90])

    # Save the License Number of the car
    license_number = Ocr_reader('saved_images/cropped.jpg')

    if not license_number:
        license_number = "No Number Found!"

    print("License Plate:", license_number)

    save_output_video = f"C:/Users/usman/LitterCam-AI/frontend/src/assets/videos/output.mp4"
    save_output_image = f"C:/Users/usman/LitterCam-AI/frontend/src/assets/images/Frame.jpg"

    copy_file(output_video_path,
              save_output_video)
    copy_file('saved_images/Frame.jpg',
              save_output_image)

    return save_output_video, save_output_image, license_number


if __name__ == "__main__":
    # main()
    Process_video('video 1.mp4')
