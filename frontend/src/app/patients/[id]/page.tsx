"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PatientData {
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
      User: {
        name: "John Smith",
        age: "45",
        gender: "Male",
        symptoms: "Persistent headache and dizziness",
        conditions: "Hypertension",
        medications: "Lisinopril 10mg daily",
      },
      diagnoses: [
        {
          name: "Tension Headache with Hypertension",
          explanation: "The patient's symptoms suggest tension headaches possibly exacerbated by high blood pressure.",
          common_symptoms: [
            "Persistent headache",
            "Dizziness",
            "Neck tension",
            "Fatigue"
          ],
          causes: [
            "Stress",
            "Poor posture",
            "High blood pressure",
            "Lack of sleep"
          ],
          potential_treatments: [
            "Blood pressure medication adjustment",
            "Stress management techniques",
            "Physical therapy",
            "Regular exercise"
          ],
          recommendations: [
            "Monitor blood pressure daily",
            "Practice stress reduction techniques",
            "Maintain regular sleep schedule",
            "Follow up with primary care physician"
          ],
          next_steps: "Schedule follow-up appointment in 2 weeks to assess medication effectiveness."
        },
        {
          name: "Secondary Assessment",
          explanation: "Additional evaluation of stress-related factors contributing to symptoms.",
          common_symptoms: [
            "Anxiety",
            "Sleep disturbance",
            "Muscle tension"
          ],
          causes: [
            "Work-related stress",
            "Inadequate rest",
            "Poor ergonomics"
          ],
          potential_treatments: [
            "Cognitive behavioral therapy",
            "Relaxation techniques",
            "Ergonomic adjustments"
          ],
          recommendations: [
            "Consider stress management counseling",
            "Implement ergonomic workspace changes",
            "Start daily relaxation practice"
          ],
          next_steps: "Evaluate effectiveness of stress management interventions in one month."
        }
      ],
      message: "Your case has been reviewed and a comprehensive treatment plan has been developed.",
      summary: "Patient presents with tension headaches and dizziness, complicated by existing hypertension. Primary focus is on managing blood pressure and addressing stress-related factors. Treatment plan includes medication adjustment, lifestyle modifications, and stress management techniques. Regular monitoring and follow-up appointments are essential for optimal outcomes."
    };

    // Simulate API delay
    setTimeout(() => {
      setPatientData(mockData);
    }, 1000);
  }, [params.id]);

  if (!patientData) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-xl font-semibold">Loading patient data...</div>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Patient Details</h1>
      
      {/* User Information */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">User Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded">
            <p><strong>Name:</strong> {patientData.User.name}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p><strong>Age:</strong> {patientData.User.age}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p><strong>Gender:</strong> {patientData.User.gender}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p><strong>Symptoms:</strong> {patientData.User.symptoms}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p><strong>Conditions:</strong> {patientData.User.conditions}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p><strong>Medications:</strong> {patientData.User.medications}</p>
          </div>
        </div>
      </div>

      {/* Diagnoses */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Diagnoses</h2>
        {patientData.diagnoses.map((diagnosis, index) => (
          <div key={index} className="mb-6 p-6 bg-white rounded-lg shadow-sm">
            <h3 className="font-semibold mb-3 text-lg">{diagnosis.name}</h3>
            <p className="mb-4 text-gray-600">{diagnosis.explanation}</p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-medium mb-2 text-blue-600">Common Symptoms</h4>
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
              <h4 className="font-medium mb-2 text-blue-600">Recommendations</h4>
              <ul className="list-disc pl-4 space-y-1">
                {diagnosis.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
            
            <div className="mt-4 border-t pt-4">
              <p><strong>Next Steps:</strong> {diagnosis.next_steps}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Summary</h2>
        <p className="text-gray-600">{patientData.summary}</p>
      </div>
    </div>
  );
}