import os
import requests
from flask import Flask, request, jsonify, render_template
from twilio.rest import Client
from twilio.twiml.voice_response import VoiceResponse
import dotenv
import json

from utils.userIO.twilio_setup import make_call, transcribe_audio
from utils.prompt.assistant import WaabanAssistant as Assistant

# Load environment variables from a .env file
dotenv.load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Example ngrok URL, replace with the actual URL provided by ngrok
NGROK_URL = os.getenv("NGROK_URL")

# Folder where audio files will be saved
AUDIO_FOLDER = "audio_files"
os.makedirs(AUDIO_FOLDER, exist_ok=True)

# Deepgram API key (load from environment)
DG_KEY = os.getenv("DEEPGRAM_API_KEY")

# Path to save the transcript JSON file
TRANSCRIPT_FILE = "transcript.json"

@app.route("/")
def home():
    return "Hello, World!"

@app.route("/make-call")
def make_call_route():
    call = make_call()
    return f"Call initiated: {call.sid}"

@app.route("/twiml-record", methods=["POST"])
def twiml_record():
    voice_response = VoiceResponse()
    voice_response.say("Hello! Please provide the following information. Start with your full name, then your age, followed by your gender, and finally describe your symptoms. When you’re finished, press the pound key. Thank you.")
    voice_response.record(
        max_length=30,
        finish_on_key="#",  # Ends the recording when the user presses
        recording_status_callback=f"{NGROK_URL}/recording-complete",  # Set the recording status callback URL
    )

    return str(voice_response)

@app.route("/recording-complete", methods=["POST"])
def recording_complete():
    # Extract the URL and SID of the recording from the request
    recording_url = request.values['RecordingUrl'] + '.mp3'
    # recording_sid = request.values['RecordingSid']
    
    # print(f"Recording completed. URL: {recording_url}, SID: {recording_sid}")

    # Set the filename to 'recording.mp3' instead of using the recording SID
    filename = "recording.mp3"
    audio_file_path = os.path.join(AUDIO_FOLDER, filename)

    try:
        # Download the recording and save it locally
        response = requests.get(recording_url)
        if response.status_code == 200:
            with open(audio_file_path, 'wb') as file:
                file.write(response.content)
            print(f"Recording saved at: {audio_file_path}")
        else:
            print(f"Failed to download recording. Status code: {response.status_code}")
            return jsonify({"error": "Failed to download recording"}), 500

        # Now, send the audio file to Deepgram for transcription
        transcription = transcribe_audio(audio_file_path)

        if transcription:
            print(f"Transcription: {transcription}")

            Assistant().create_json(transcription)

            return jsonify({"transcription": transcription}), 200
        # else:
        #     print("Error during transcription.")
        #     return jsonify({"error": "Failed to transcribe audio"}), 500

    except Exception as e:
        print(f"Error during recording completion: {e}")
        # return jsonify({"error": e}), 500
 
    os.remove(audio_file_path)  # Delete the audio file after transcription
    return True

@app.route("/data", methods=["GET"])
def get_data():
    with open('./backend/data.json', 'r') as file:
        data = json.load(file)

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
