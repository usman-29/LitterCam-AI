from moviepy.editor import VideoFileClip


def convert_avi_to_mp4(input_avi_path, output_mp4_path):
    # Load the AVI video file
    clip = VideoFileClip(input_avi_path)

    # Write the result to a new MP4 file
    clip.write_videofile(output_mp4_path, codec='libx264')


def main():
    convert_avi_to_mp4("../output_video/output_video_7.avi",
                       "../output_video/output.mp4")


if __name__ == "__main__":
    main()
