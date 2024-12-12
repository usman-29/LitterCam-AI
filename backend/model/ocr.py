import easyocr
import cv2


def Ocr_reader(path):
    # Initialize the EasyOCR reader (English language)
    reader = easyocr.Reader(['en'])

    # Load the image
    image = cv2.imread(path)

    # Perform OCR on the image
    results = reader.readtext(image)

    # Extract and print the detected text
    detected_text = ' '.join([res[1] for res in results])
    print("Detected license plate text:", detected_text)
    return detected_text
