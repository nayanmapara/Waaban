import os
from twilio.rest import Client
from dotenv import load_dotenv
import requests

# Load environment variables from a .env file
load_dotenv()

NGROK_URL = os.getenv("NGROK_URL")
DG_KEY = os.getenv("DEEPGRAM_API_KEY")

# Initialize the Twilio client
def initialize_twilio_client():
    account_sid = os.environ["TWILIO_ACCOUNT_SID"]
    auth_token = os.environ["TWILIO_AUTH_TOKEN"]
    return Client(account_sid, auth_token)

# Initiate the call and direct it to our custom TwiML route for recording
def make_call():
    client = initialize_twilio_client()
    from_number = os.environ["TWILIO_PHONE_NUMBER"]

    call = client.calls.create(
        from_=from_number,
        to="+12898855193",  # Target phone number
        url=f"{NGROK_URL}/twiml-record"  # Custom TwiML URL for recording
    )
    return call

def transcribe_audio(audio_file_path):
    """Send the audio file to Deepgram for transcription"""
    deepgram_url = "https://api.deepgram.com/v1/listen"
    headers = {
        "Authorization": f"Token {DG_KEY}",
        "Content-Type": "application/octet-stream"
    }

    try:
        with open(audio_file_path, 'rb') as f:
            audio_data = f.read()

        # Send the file to Deepgram for transcription
        response = requests.post(deepgram_url, headers=headers, data=audio_data)
        if response.status_code == 200:
            transcription_data = response.json()
            # Extract the transcription text
            transcription = transcription_data.get("results", {}).get("channels", [{}])[0].get("alternatives", [{}])[0].get("transcript", "")

            return transcription
        else:
            print(f"Deepgram API error: {response.status_code}")
            return None

    except Exception as e:
        print(f"Error during transcription: {e}")
        return None