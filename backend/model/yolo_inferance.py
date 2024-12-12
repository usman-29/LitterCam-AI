import cv2
from ultralytics import YOLO
import matplotlib.pyplot as plt

# Load the trained YOLO model
model = YOLO('model_weights/latest.pt')


def license_Extract(path):
    # Run prediction on the image
    results = model.predict(path)

    # Load the image using OpenCV for later cropping
    image = cv2.imread(path)

    # Loop through the detections
    for result in results:
        boxes = result.boxes  # Bounding boxes
        classes = result.names  # Class names

        # Loop through each detected box
        for box in boxes:
            # Get the class index and check if it's 'license'
            class_id = int(box.cls)  # Class ID of the detected object
            class_name = classes[class_id]  # Convert class ID to class name

            if class_name == "license":
                # Get the bounding box coordinates (x1, y1, x2, y2)
                # Bounding box coordinates
                x1, y1, x2, y2 = map(int, box.xyxy[0])

                # Extract the region inside the bounding box
                # Crop the ROI from the image
                license_region = image[y1:y2, x1:x2]

                # Save the cropped license region as a JPEG image
                jpeg_path = "output_videos/license_region.jpg"
                cv2.imwrite(jpeg_path, license_region, [
                            cv2.IMWRITE_JPEG_QUALITY, 90])
                print(f"License region saved as '{jpeg_path}'")

                return license_region
