from flask import Flask, request, jsonify, send_from_directory
import os
from werkzeug.utils import secure_filename
from model.main import Process_video
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.types import LargeBinary
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
    video = db.Column(LargeBinary)
    image = db.Column(LargeBinary)


# Create database tables
with app.app_context():
    db.create_all()

# Configure paths for input videos, output videos, and saved images
app.config['INPUT_VIDEOS_PATH'] = os.path.abspath('./input_videos/')


def store_video_processing_data(save_output_video, save_output_image):
    try:
        # Read output video if exists
        output_video_data = None
        if save_output_video and os.path.exists(save_output_video):
            with open(save_output_video, 'rb') as output_video_file:
                output_video_data = output_video_file.read()

        # Read output image if exists
        output_image_data = None
        if save_output_image and os.path.exists(save_output_image):
            with open(save_output_image, 'rb') as output_image_file:
                output_image_data = output_image_file.read()

        # Create new database record
        new_record = MediaStorage(
            video=output_video_data,
            image=output_image_data
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


# Retrieve video processing data
@app.route('/retrieve/<int:record_id>', methods=['GET'])
def retrieve_video_processing_data(record_id):
    record = MediaStorage.query.get_or_404(record_id)

    # Convert bytes to Base64 strings
    video_base64 = base64.b64encode(record.video).decode(
        'utf-8') if isinstance(record.video, bytes) else record.video
    image_base64 = base64.b64encode(record.image).decode(
        'utf-8') if isinstance(record.image, bytes) else record.image

    return jsonify({
        'video': video_base64,
        'image': image_base64,
    }), 200


if __name__ == '__main__':
    app.run(debug=True)
