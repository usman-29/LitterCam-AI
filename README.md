# LitterCam AI

LitterCam AI is an innovative project aimed at detecting and tracking littering incidents by identifying vehicles involved in the act. It uses cutting-edge computer vision and OCR technologies to promote a cleaner environment.

## Features

- Detects vehicles and litter objects.
- Tracks objects.
- Identifies the nearest vehicle to litter and captures its license plate.
- Reads license plate numbers.

---

## Technologies Used

### Backend
- **Framework**: Flask
- **Language**: Python
- **Libraries**:
  - `ultralytics` (YOLOv8)
  - `opencv-python` (OpenCV)
  - `supervisely` (ByteTrack)
  - `numpy`
  - `flask`
  - `easyocr`

### Frontend
- **Framework**: React.js (with Vite)
- **Language**: JavaScript
- **Libraries**:
  - `react-router-dom`

---

## How It Works

1. **Vehicle and Litter Detection**:
   - YOLOv8 is used to detect vehicles and litter objects in the video.

2. **Object Tracking**:
   - ByteTracker ensures continuous tracking of vehicles and litter objects.

3. **License Plate Identification**:
   - When litter is detected, the nearest vehicle is identified.
   - EasyOCR reads the license plate number from the detected vehicle.

---

## Dataset

- **Sources**: 
  - Roboflow: Pre-annotated datasets for vehicles, litter objects, and license plates.
  - Custom-created dataset: Additional images annotated for better performance.

---

## Evaluation Metrics

- **Precision (P)**: 91.2%  
- **Recall (R)**: 83.7%  
- **Mean Average Precision at IoU Threshold 0.5 (mAP50)**: 89.8%  
- **Mean Average Precision across IoU Thresholds 0.5 to 0.95 (mAP50-95)**: 77.8%  

---

## Installation

### Preparation
1. Create the following directories in the project root:
   - `input_videos`
   - `model_weights`
   - `output_videos`
   - `saved_images`
2. Place the YOLOv8 model weights inside the `model_weights` folder with the following names:
   - `best4.pt`
   - `latest.pt`

### Backend Setup
1. Clone the repository and navigate to the backend folder.
2. Install required libraries using requirement.txt:
   ```bash
   pip install -r requirements.txt
   ```
3. Run Flask server:
  ```bash
  flask run app
  ```

### Frontend Setup
1. Navigate to the frontend folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
  ```bash
  npm run dev
  ```

---

## Usage

1. **Run Backend**:
   - Start the Flask server:
     ```bash
     python app.py
     ```

2. **Run Frontend**:
   - Navigate to the frontend directory and start the development server:
     ```bash
     npm run dev
     ```

3. **Upload Video**:
   - Access the application through the frontend.
   - Upload the video file via the provided interface in Demo page.

4. **View Results**:
   - The results will be displayed as two videos in a row: one showing the original video and the other with detected bounding boxes. Below the videos, the license numbers of vehicles involved in littering will be shown. 

---

## Screenshot
<img width="947" alt="image" src="https://github.com/user-attachments/assets/4fef8cf4-ea3d-4f03-a7ce-38c360df06f0" />


---

## Contributors

- **Usman Saeed**  
  - [LinkedIn](https://linkedin.com/in/usmanxsaeed)  
  - [GitHub](https://github.com/usman-29)  

- **Matee Ur Rehman**  
  - [LinkedIn](https://linkedin.com/in/mateeurrehman4)  
  - [GitHub](https://github.com/mateecs)

---

## License

This project is open-source and available under the [MIT License](LICENSE).
