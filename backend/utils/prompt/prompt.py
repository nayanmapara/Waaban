# %%
from openai import OpenAI
import os

# client = OpenAI(base_url="https://api.groq.com/openai/v1",
#                 api_key=os.environ['GROQ_API_KEY'])
client = OpenAI(base_url="https://api.groq.com/openai/v1",
                api_key='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')

# %%
def determine_category(symptoms):
    # Simple logic to categorize based on symptoms (you can expand this logic as needed)
    symptoms_lower = symptoms.lower()
    if any(keyword in symptoms_lower for keyword in ["headache", "pain", "fever", "runny nose", "cough", "fatigue"]):
        return "Physical Health and Wellness"
    elif any(keyword in symptoms_lower for keyword in ["anxiety", "stress", "depression", "mood", "sleep"]):
        return "Mental and Emotional Health"
    elif any(keyword in symptoms_lower for keyword in ["sti", "sexual", "intimacy", "partner", "sexual health"]):
        return "Sexual Health and Intimacy"
    else:
        return "General Wellness"  # Default category if symptoms don't match specific criteria

def generate_optimized_prompt(customer_data):
    # Determine the category based on symptoms
    category = determine_category(customer_data.get("symptoms", ""))
    
    # Generate the prompt based on customer data and determined category
    prompt = f"""
    You're Waaban, a virtual health assistant designed to provide personalized health and wellness guidance. you will help patient address their medical concerns and if need be help them connect with healthcare providers.
    Generate a personalized response based on the following customer data and relevant category.

    1. **General Information**:
       - Name: {customer_data.get('name')}
       - Age: {customer_data.get('age')}
       - Gender: {customer_data.get('gender')}
       - Location: {customer_data.get('location')}

    2. **Health Information**:
       - Symptoms: {customer_data.get('symptoms')}
       - Existing Conditions: {customer_data.get('conditions')}
       - Current Medications: {customer_data.get('medications')}
       - Allergies: {customer_data.get('allergies')}
       - Medical History: {customer_data.get('medical_history')}
       - Family History: {customer_data.get('family_history')}
       - Surgery History: {customer_data.get('surgery_history')}

    3. **Lifestyle Details**:
       - Pregnancy Status: {customer_data.get('pregnancy_status')}
       - Smoking Status: {customer_data.get('smoking_status')}
       - Alcohol Consumption: {customer_data.get('alcohol_consumption')}
       - Exercise Frequency: {customer_data.get('exercise_frequency')}
       - Sleep Duration: {customer_data.get('sleep_duration')}
       - Physical Activity: {customer_data.get('physical_activity')}
       - Diet Preferences: {customer_data.get('diet_preferences')}
       - Vaccination Status: {customer_data.get('vaccination_status')}

    4. **Category Derived from Symptoms**:
       - Relevant Category: {category}

    Based on the provided data and category ({category}), generate a comprehensive and professional response that:
    - Addresses the customer's concerns and symptoms.
    - Offers personalized recommendations and guidance based on their unique situation.
    - help them connect with local healthcare providers or resources if needed.
    Ensure the response is empathetic, practical, and tailored to the customer's unique situation, while offering actionable steps and reminders to support their well-being.
    """
    return prompt
# user schema: name, purpose : conveinece, anytime help, instant response, central repo stats. health card info via message. 
# id, ticket, account, prediction while on call, doctor tickets created 
# Example usage
customer_data = {
    "Name": "John Doe",
    "symptoms": "I have a rash on my penis",
    "age": "30",
    "gender": "male",
    "existing_conditions": "None",
    "current_medications": "None",
    "allergies": "None"
}


# Generate prompt
prompt = generate_optimized_prompt(customer_data)
print(prompt)


# %%
def determine_category(symptoms):
    # Expanded and refined logic to categorize based on symptoms
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
        return "General Wellness"  # Default category if symptoms don't match specific criteria

def generate_optimized_prompt(customer_data):
    # Determine the category based on symptoms
    category = determine_category(customer_data.get("symptoms", ""))
    
    # Generate category-specific recommendations
    category_specific_content = ""
    if category == "Physical Health and Wellness":
        category_specific_content = f"""
        Provide a personalized set of recommendations to enhance the user's physical well-being. Address their symptoms: {customer_data.get('symptoms')}. Include suggestions for dietary changes, exercise routines, hydration, and sleep hygiene. Take into account existing conditions such as {customer_data.get('conditions')} and current medications like {customer_data.get('medications')}. Ensure recommendations are practical, balanced, and supportive.
        """
    elif category == "Mental and Emotional Health":
        category_specific_content = f"""
        Create a supportive and professional response to help the user manage feelings of stress or other emotional challenges. Address their symptoms: {customer_data.get('symptoms')}. Offer techniques such as mindfulness exercises, structured routines, and tips for managing stress and anxiety. Include encouragement to seek further support or counseling if necessary, with an empathetic and compassionate approach.
        """
    elif category == "Sexual Health and Intimacy":
        category_specific_content = f"""
        Provide a professional and compassionate response to the user's concerns about sexual health or STI-related issues. Address their symptoms: {customer_data.get('symptoms')}. Include guidance on confidential testing, safe practices, and addressing symptoms like {customer_data.get('symptoms')}. Emphasize the importance of medical consultation when needed and maintain a non-judgmental, supportive tone.
        """

    # Generate the response string using customer data and the relevant category content
    response = f"""
    Hi {customer_data.get('name')}, I am Waaban, a virtual health assistant designed to provide personalized health and wellness guidance. Based on your provided information, here is my response:
    
    {category_specific_content}
    
    If necessary, please consider connecting with a healthcare provider for further assistance.
    """
    
    # Return the data in JSON format
    output = {
        "Subject": f"Health Guidance for {customer_data.get('name')}",
        "Response": response.strip(),
        "Primary Category": category,
        "Action": "Offer guidance, recommend further consultation if needed, and provide empathetic and practical advice."
    }
    
    return output

# Example usage
customer_data = {
    "name": "Rupin Munjal",
    "phone": "1234567890",
    "symptoms": "I feel nauseous and have a headache, I went to a strip club last night and had sex with a stripper",
    "age": "19",
    "gender": "male",
    "location": "Oakville",
    "conditions": "low vitamin D & B12",
    "medications": "B12 supplements",
    "allergies": "",
    "vaccination_status": "I am fully vaccinated",
    "medical_history": "",
    "family_history": "",
    "surgery_history": "",
    "pregnancy_status": "I am not pregnant",
    "smoking_status": "I am a non-smoker",
    "alcohol_consumption": "",
    "exercise_frequency": "I exercise daily",
    "sleep_duration": "I get 7-8 hours of sleep",
    "physical_activity": "I do physical activity",
    "diet_preferences": "I eat a balanced diet",
}

# Generate prompt
output = generate_optimized_prompt(customer_data)
print(output)


# %%
raw_response = client.chat.completions.create(
    model="llama-3.2-3b-preview",
    messages=[{"role": "user", "content": prompt}]
)
response = raw_response.choices[0].message.content
print(response)


# %%



