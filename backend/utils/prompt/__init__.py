
import os
from waaban import WaabanAssistant


if __name__ == "__main__":

    api_key = os.environ.get('GROQ_API_KEY')
    assistant = WaabanAssistant(api_key=api_key)

    customer_data = {
        "name": "John Doe",
        "symptoms": "I have a rash on my penis",
        "age": "30",
        "gender": "male",
        "conditions": "None",
        "medications": "None"
    }

    assistant.run(customer_data)
