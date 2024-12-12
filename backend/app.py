from flask import Flask, request, jsonify, send_from_directory
import os
from werkzeug.utils import secure_filename
from model.main import Process_video
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.types import String
import base64

app = Flask(__name__)
CORS(app)

# Configure SQLAlchemy database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///media_storage.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define Media Model


class MediaStorage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    video = db.Column(String)
    image = db.Column(String)


# Create database tables
with app.app_context():
    db.create_all()

# Configure paths for input videos, output videos, and saved images
app.config['INPUT_VIDEOS_PATH'] = os.path.abspath('./input_videos/')


def store_video_processing_data(save_output_video, save_output_image):
    try:

        # Create new database record
        new_record = MediaStorage(
            video=save_output_video,
            image=save_output_image
        )

        # Add and commit the record
        db.session.add(new_record)
        db.session.commit()

        return new_record

    except Exception as e:
        print(f"Error storing video processing data: {e}")
        db.session.rollback()
        return None


@app.route('/', methods=['POST'])
def upload_video():
    # Video file that user uploads
    video = request.files['video']
    filename = secure_filename(video.filename)

    # Save the original video in the input directory
    video_path = os.path.join(app.config['INPUT_VIDEOS_PATH'], filename)
    video.save(video_path)

    # Process the video
    save_output_video, save_output_image, license_number = Process_video(
        video_path)

    print("License Number:", license_number)

    # Store processed data in database
    db_record = store_video_processing_data(
        save_output_video=save_output_video,
        save_output_image=save_output_image,
    )

    print("ID OF DB:")
    print(db_record.id)

    return jsonify({
        'license_number': license_number,
        'database_record_id': db_record.id if db_record else None
    }), 200


@app.route('/media/<path:filename>')
def serve_media(filename):
    # Determine the directory based on file extension
    if filename.endswith('.mp4'):
        directory = os.path.dirname(filename)
        return send_from_directory(directory, os.path.basename(filename))
    elif filename.endswith(('.jpg', '.jpeg', '.png')):
        directory = os.path.dirname(filename)
        return send_from_directory(directory, os.path.basename(filename))
    else:
        return jsonify({'error': 'Invalid file type'}), 400


@app.route('/retrieve/<int:record_id>', methods=['GET'])
def retrieve_video_processing_data(record_id):
    record = MediaStorage.query.get_or_404(record_id)

    print("DATABASE RESPONSE")
    print("Video Path:", record.video)
    print("Image Path:", record.image)

    # Construct full URLs for media files
    base_url = request.host_url.rstrip('/')
    video_url = f"{base_url}/media/{record.video}"
    image_url = f"{base_url}/media/{record.image}"

    return jsonify({
        'video': video_url,
        'image': image_url,
    }), 200


# Retrieve video processing data
# @app.route('/retrieve/<int:record_id>', methods=['GET'])
# def retrieve_video_processing_data(record_id):
#     record = MediaStorage.query.get_or_404(record_id)

#     print("DATABASE RESPONSE")
#     print(record.video)
#     print(record.image)

#     return jsonify({
#         'videoPath': record.video,
#         'imagePath': record.image,
#     }), 200


if __name__ == '__main__':
    app.run(debug=True)
