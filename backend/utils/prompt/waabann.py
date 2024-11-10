import os
import json
import re
from datetime import datetime
from openai import OpenAI

class WaabanAssistant:
    """
    Waaban is a virtual health assistant designed to provide personalized health and wellness guidance.
    """

    def __init__(self, api_key=None, output_dir='./backend/utils/prompt/output', base_url="https://api.groq.com/openai/v1"):
        """
        Initialize the WaabanAssistant with the OpenAI API client.

        Parameters
        ----------
        api_key : str, optional
            The API key for the OpenAI service. If not provided, it will be read from the environment variable 'GROQ_API_KEY'.
        output_dir : str, optional
            The directory where output files will be saved.
        base_url : str, optional
            The base URL for the OpenAI API.
        """
        if api_key is None:
            api_key = os.environ.get('GROQ_API_KEY')
            if api_key is None:
                raise ValueError("API key not provided and 'GROQ_API_KEY' environment variable not set.")
        self.client = OpenAI(base_url=base_url, api_key=api_key)
        self.output_dir = output_dir
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)

    def determine_category(self, symptoms):
        """
        Determine the category of the given symptoms.

        Parameters
        ----------
        symptoms : str
            The symptoms to categorize.

        Returns
        -------
        str
            The category of the symptoms.
        """
        symptoms_lower = symptoms.lower()
        
        physical_health_keywords = [
            "headache", "pain", "fever", "runny nose", "cough",
            "fatigue", "bloating", "constipation", "nausea", "muscle ache"
        ]
        mental_health_keywords = [
            "anxiety", "stress", "depression", "mood", "sleep",
            "panic", "overwhelm", "burnout", "insomnia"
        ]
        sexual_health_keywords = [
            "sti", "sexual", "intimacy", "partner", "sexual health",
            "rash", "itching", "discharge", "erectile dysfunction"
        ]
        
        if any(keyword in symptoms_lower for keyword in physical_health_keywords):
            return "Physical Health and Wellness"
        elif any(keyword in symptoms_lower for keyword in mental_health_keywords):
            return "Mental and Emotional Health"
        elif any(keyword in symptoms_lower for keyword in sexual_health_keywords):
            return "Sexual Health and Intimacy"
        else:
            return "General Wellness" 

    def get_category_content(self, category, customer_data):
        """
        Generate category-specific content for the prompt.

        Parameters
        ----------
        category : str
            The category determined from the symptoms.
        customer_data : dict
            The customer's data.

        Returns
        -------
        str
            The category-specific content for the prompt.
        """
        if category == "Physical Health and Wellness":
            category_content = f"""
            Provide a personalized set of recommendations to enhance the user's physical well-being. Address their symptoms: {customer_data.get('symptoms')}. Include suggestions for dietary changes, exercise routines, hydration, and sleep hygiene. Take into account existing conditions such as {customer_data.get('conditions', 'None')} and current medications like {customer_data.get('medications', 'None')}. Ensure recommendations are practical, balanced, and supportive.
            """
        elif category == "Mental and Emotional Health":
            category_content = f"""
            Create a supportive and professional response to help the user manage feelings of stress or other emotional challenges. Address their symptoms: {customer_data.get('symptoms')}. Offer techniques such as mindfulness exercises, structured routines, and tips for managing stress and anxiety. Include encouragement to seek further support or counseling if necessary, with an empathetic and compassionate approach.
            """
        elif category == "Sexual Health and Intimacy":
            category_content = f"""
            Provide a professional and compassionate response to the user's concerns about sexual health or STI-related issues. Address their symptoms: {customer_data.get('symptoms')}. Include guidance on confidential testing, safe practices, and addressing symptoms like {customer_data.get('symptoms')}. Emphasize the importance of medical consultation when needed and maintain a non-judgmental, supportive tone.
            """
        else:
            category_content = ""
        return category_content

    def generate_optimized_prompt(self, customer_data):
        """
        Generate the prompt for the OpenAI model.

        Parameters
        ----------
        customer_data : dict
            The customer's data.

        Returns
        -------
        str
            The prompt to be sent to the OpenAI API.
        """
        category = self.determine_category(customer_data.get("symptoms", ""))
        category_content = self.get_category_content(category, customer_data)

        prompt = f"""
        You are Waaban, a virtual health assistant designed to provide personalized health and wellness guidance.

        Based on the following customer data, provide a detailed JSON response in the specified format:

        Customer Data:
        - Name: {customer_data.get('name')}
        - Age: {customer_data.get('age')}
        - Gender: {customer_data.get('gender')}
        - Symptoms: {customer_data.get('symptoms')}

        Category: {category}

        {category_content}

        Instructions:
        - Generate a JSON object with the following structure:
        {{  
            "User":{{
                "name": "{customer_data.get('name')}",
                "age": "{customer_data.get('age')}",
                "gender": "{customer_data.get('gender')}",
                "symptoms": "{customer_data.get('symptoms')}",
                "conditions": "{customer_data.get('conditions', 'None')}",
                "medications": "{customer_data.get('medications', 'None')}"
            }},
            "diagnoses": [
                {{
                    "name": "Diagnosis Name",
                    "explanation": "Detailed explanation of the diagnosis.",
                    "common_symptoms": ["Symptom1", "Symptom2", "..."],
                    "causes": ["Cause1", "Cause2", "..."],
                    "potential_treatments": ["Treatment1", "Treatment2", "..."],
                    "recommendations": ["Recommendation1", "Recommendation2", "..."],
                    "next_steps": "Suggested next steps."
                }}
            ],
            "message": "A message to the user that their information has been processed and a ticket has been created.",
            "summary": "A detailed summary of the information. This should be concise and informative. Text should be limited to 200-250 words. Include key details and recommendations."
        }}

        - Fill in the JSON structure with the relevant information based on the customer's symptoms and category.
        - Ensure the JSON output is properly formatted and contains all the necessary information.
        - Return only the JSON output in the specified format.
        """

        return prompt

    def get_response(self, prompt):
        """
        Send the prompt to the OpenAI API and get the response.

        Parameters
        ----------
        prompt : str
            The prompt to send to the API.

        Returns
        -------
        str
            The response from the API.
        """
        raw_response = self.client.chat.completions.create(
            model="llama-3.2-3b-preview",
            messages=[{"role": "user", "content": prompt}]
        )
        response = raw_response.choices[0].message.content
        return response

    def process_response(self, response, customer_data):
        """
        Process the response from the API and save it to a JSON file.

        Parameters
        ----------
        response : str
            The response from the API.
        customer_data : dict
            The customer's data.
        """
        try:
            response = response.strip()
            if response.startswith('```') and response.endswith('```'):
                response = response.strip('```').strip('json').strip()
            json_output = json.loads(response)
            sanitized_name = re.sub(r'\W+', '_', customer_data.get('name').lower())
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            output_file_path = os.path.join(self.output_dir, f"{sanitized_name}_{timestamp}.json")
            
            with open(output_file_path, 'w') as json_file:
                json.dump(json_output, json_file, indent=4)
            print(f"JSON output saved to {output_file_path}")
        except json.JSONDecodeError as e:
            print("Failed to parse response as JSON")
            print(f"Error: {e}")
            print("Response:")
            print(response)

    def run(self, customer_data):
        """
        Run the assistant with the given customer data.

        Parameters
        ----------
        customer_data : dict
            The customer's data.
        """
        prompt = self.generate_optimized_prompt(customer_data)
        response = self.get_response(prompt)
        self.process_response(response, customer_data)
