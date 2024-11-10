# main.py
import os
from Waaban import WaabanAssistant
from dotenv import load_dotenv

load_dotenv()

if __name__ == "__main__":
    # Get the API key from environment variable
    api_key = os.environ.get('GROQ_API_KEY')
    if not api_key:
        raise ValueError("API key not found. Please set the 'GROQ_API_KEY' environment variable.")

    assistant = WaabanAssistant(api_key=api_key)

    customer_data = {
        "name": "John Doe",
        "symptoms": "I have a rash on my penis",
        "age": "30",
        "gender": "male"
    }

    assistant.create_json(customer_data)
