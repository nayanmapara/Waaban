"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PatientData {
  Description: string;
  Priority: string;
  User: {
    name: string;
    age: string;
    gender: string;
    symptoms: string;
    conditions: string;
    medications: string;
  };
  diagnoses: Array<{
    name: string;
    explanation: string;
    common_symptoms: string[];
    causes: string[];
    potential_treatments: string[];
    recommendations: string[];
    next_steps: string;
  }>;
  message: string;
  summary: string;
}

export default function PatientPage() {
  const params = useParams();
  const [patientData, setPatientData] = useState<PatientData | null>(null);

  useEffect(() => {
    // Simulate API call with mock data
    const mockData: PatientData = {
      Description:
        "Our health assistant has generated a personalized diagnosis and treatment plan for your symptoms. This report includes a detailed explanation of the diagnosis, common symptoms, potential causes, and recommended treatment options. We also provide guidance on the next steps to take, including scheduling a follow-up appointment with your doctor.",
      Priority: "Medium",
      User: {
        name: "Adam Smith",
        age: "19",
        gender: "None",
        symptoms:
          "Really tired and have a headache for last one day, I have no other symptoms at the moment. I'm on new medications and have no previous conditions.",
        conditions: "None",
        medications: "None",
      },
      diagnoses: [
        {
          name: "Delayed Sleep Phase Syndrome",
          explanation:
            "This is a diagnosis based on your symptoms of fatigue and headache. Delayed sleep phase syndrome is a condition where the body's internal clock is out of sync, leading to fatigue, difficulty concentrating, and other symptoms. It's possible that your recent changes, including new medications and irregular sleep schedule, may be contributing to this condition.",
          common_symptoms: [
            "Persistent fatigue",
            "Headaches",
            "Difficulty concentrating",
            "Mood changes",
          ],
          causes: [
            "Irregular sleep schedule",
            "New medications",
            "Dehydration",
            "Poor diet",
          ],
          potential_treatments: [
            "Establishing a consistent sleep schedule",
            "Staying hydrated",
            "Improving diet",
            "Avoiding caffeine and electronics before bedtime",
          ],
          recommendations: [
            "Ensure you get 7-8 hours of sleep each night to help regulate your body's internal clock.",
            "Stay hydrated by drinking plenty of water throughout the day.",
            "Avoid caffeine and electronics before bedtime to help improve sleep quality.",
            "Eat a balanced diet that includes plenty of fruits, vegetables, and whole grains.",
          ],
          next_steps:
            "Schedule a follow-up appointment with your doctor to discuss a personalized treatment plan.",
        },
      ],
      message:
        "Your information has been processed, and a ticket has been created. Our health assistant will provide you with personalized recommendations and monitoring to help alleviate your symptoms.",
      summary:
        "Based on your symptoms and medical history, our health assistant has diagnosed Delayed Sleep Phase Syndrome. To help alleviate your symptoms, we recommend establishing a consistent sleep schedule, staying hydrated, avoiding caffeine and electronics before bedtime, and improving your diet. We also suggest scheduling a follow-up appointment with your doctor to discuss a personalized treatment plan. We will be monitoring your progress and providing you with regular updates.",
    };

    // Simulate API delay
    setTimeout(() => {
      setPatientData(mockData);
    }, 1000);
  }, [params.id]);

  if (!patientData)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">Loading patient data...</div>
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="flex text-4xl justify-center font-bold mb-6">
        Patient Details
      </h1>

      {/* User Information */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          User Information
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded">
            <p>
              <strong>Name:</strong> {patientData.User.name}
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p>
              <strong>Age:</strong> {patientData.User.age}
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p>
              <strong>Gender:</strong> {patientData.User.gender}
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p>
              <strong>Symptoms:</strong> {patientData.User.symptoms}
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p>
              <strong>Conditions:</strong> {patientData.User.conditions}
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p>
              <strong>Medications:</strong> {patientData.User.medications}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          Description
        </h2>
        <p className="text-gray-600">{patientData.Description}</p>
      </div>

      {/* Priority */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Priority</h2>
        <p className="text-gray-600">{patientData.Priority}</p>
      </div>

      {/* Diagnoses */}
      <div className="mb-6 p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Diagnoses</h2>
        {patientData.diagnoses.map((diagnosis, index) => (
          <div key={index}>
            <h3 className="font-semibold mb-3 text-lg">{diagnosis.name}</h3>
            <p className="mb-4 text-gray-600">{diagnosis.explanation}</p>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-medium mb-2 text-blue-600">
                  Common Symptoms
                </h4>
                <ul className="list-disc pl-4 space-y-1">
                  {diagnosis.common_symptoms.map((symptom, i) => (
                    <li key={i}>{symptom}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-medium mb-2 text-blue-600">Causes</h4>
                <ul className="list-disc pl-4 space-y-1">
                  {diagnosis.causes.map((cause, i) => (
                    <li key={i}>{cause}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 p-4 rounded">
              <h4 className="font-medium mb-2 text-blue-600">
                Recommendations
              </h4>
              <ul className="list-disc pl-4 space-y-1">
                {diagnosis.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4 border-t pt-4">
              <p>
                <strong>Next Steps:</strong> {diagnosis.next_steps}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Summary</h2>
        <p className="text-gray-600">{patientData.summary}</p>
      </div>

      {/* Message */}
      <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Message</h2>
        <p className="text-gray-600">{patientData.message}</p>
      </div>
    </div>
  );
}
