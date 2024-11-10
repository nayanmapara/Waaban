# waaban.py
import os
import json
import re
from datetime import datetime
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class WaabanAssistant:
    def __init__(self, api_key, output_dir='./output/'):
        self.api_key = api_key
        self.output_dir = output_dir
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)
        self.client = OpenAI(base_url="https://api.groq.com/openai/v1", api_key=self.api_key)

    def determine_category(self, symptoms):
        """
        Determine the category of the given symptoms.
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

    def get_category(self, category, patient):
        """
        Generate category-specific content for the prompt.
        """
        if category == "Physical Health and Wellness":
            category_specific_content = f"""
            Provide a personalized set of recommendations to enhance the user's physical well-being. Address their symptoms: {patient.get('symptoms')}. Include suggestions for dietary changes, exercise routines, hydration, and sleep hygiene. Take into account existing conditions such as {patient.get('conditions', 'None')} and current medications like {patient.get('medications', 'None')}. Ensure recommendations are practical, balanced, and supportive.
            """
        elif category == "Mental and Emotional Health":
            category_specific_content = f"""
            Create a supportive and professional response to help the user manage feelings of stress or other emotional challenges. Address their symptoms: {patient.get('symptoms')}. Offer techniques such as mindfulness exercises, structured routines, and tips for managing stress and anxiety. Include encouragement to seek further support or counseling if necessary, with an empathetic and compassionate approach.
            """
        elif category == "Sexual Health and Intimacy":
            category_specific_content = f"""
            Provide a professional and compassionate response to the user's concerns about sexual health or STI-related issues. Address their symptoms: {patient.get('symptoms')}. Include guidance on confidential testing, safe practices, and addressing symptoms like {patient.get('symptoms')}. Emphasize the importance of medical consultation when needed and maintain a non-judgmental, supportive tone.
            """
        else:
            category_specific_content = ""
        return category_specific_content

    def generate_optimized_prompt(self, patient):
        """
        Generate the prompt for the OpenAI model.
        """
        category = self.determine_category(patient.get("symptoms", ""))
        category_content = self.get_category(category, patient)
        
        prompt = f"""
        You are Waaban, a virtual health assistant designed to provide personalized health and wellness guidance.

        Based on the following customer data, provide a detailed JSON response in the specified format:

        Customer Data:
        - Name: {patient.get('name')}
        - Age: {patient.get('age')}
        - Gender: {patient.get('gender')}
        - Symptoms: {patient.get('symptoms')}

        Category: {category}

        {category_content}

        Instructions:
        - Generate a JSON object with the following structure:
        {{  
            "User":{{
                "name": "{patient.get('name')}",
                "age": "{patient.get('age')}",
                "gender": "{patient.get('gender')}",
                "symptoms": "{patient.get('symptoms')}",
                "conditions": "{patient.get('conditions', 'None')}",
                "medications": "{patient.get('medications', 'None')}"
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

    def create_json(self, patient):
        """
        Generate the JSON response and save it to a file.
        """
        prompt = self.generate_optimized_prompt(patient)
        raw_response = self.client.chat.completions.create(
            model="llama-3.2-3b-preview",
            messages=[{"role": "user", "content": prompt}]
        )
        response = raw_response.choices[0].message.content
        
        try:
            response = response.strip()
            if response.startswith('```') and response.endswith('```'):
                response = response.strip('```').strip('json').strip()
            json_output = json.loads(response)
            sanitized_name = re.sub(r'\W+', '_', patient.get('name').lower())
            # Optionally, add a timestamp to ensure uniqueness
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
