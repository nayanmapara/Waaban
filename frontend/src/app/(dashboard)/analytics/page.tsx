"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PatientData {
    id: string;
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
    const router = useRouter();
    const [patientData, setPatientData] = useState<PatientData[]>([]);
    const [symptomCounts, setSymptomCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        async function fetchPatientData() {
            try {
                const response = await fetch('/assets/data/data.json'); // Adjust the path as needed
                if (!response.ok) {
                    throw new Error("Failed to fetch patient data");
                }
                const data: PatientData[] = await response.json();
                setPatientData(data);
                calculateSymptomCounts(data);
            } catch (error) {
                console.error("Error fetching patient data:", error);
            }
        }

        fetchPatientData();
    }, []);

    const calculateSymptomCounts = (data: PatientData[]) => {
        const counts: Record<string, number> = {};
        data.forEach(patient => {
            const symptoms = patient.User.symptoms.split(',').map(symptom => symptom.trim());
            symptoms.forEach(symptom => {
                counts[symptom] = (counts[symptom] || 0) + 1;
            });
        });
        setSymptomCounts(counts);
    };

    const handleBarClick = (id: string) => {
        router.push(`/patients/${id}`);
    };

    const chartData = {
        labels: patientData.map(patient => patient.User.name),
        datasets: [
            {
                label: 'Patient Priority Level',
                data: patientData.map(patient => {
                    switch (patient.Priority) {
                        case 'High':
                            return 3;
                        case 'Medium':
                            return 2;
                        case 'Low':
                            return 1;
                        default:
                            return 0;
                    }
                }),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };



    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="flex text-4xl justify-center font-bold mb-6">Analysis</h1>

            {/* Patient Priority Chart */}
            <div className="mb-8 bg-white p-6 text-center rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-blue-600">Patient Priority Chart</h2>
                <Bar
                    data={chartData}
                    height={500}  // Adjust the height as needed (higher number for larger size)
                    width={600}   // Adjust the width as needed (higher number for larger size)
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        onClick: (_, elements) => {
                            if (elements.length > 0) {
                                const index = elements[0].index;
                                const selectedPatient = patientData[index];
                                if (selectedPatient) {
                                    handleBarClick(selectedPatient.id);
                                }
                            }
                        },
                    }}
                />
            </div>

            {/* Patient Details */}
            {params.id && (
                <>
                    {patientData
                        .filter(patient => patient.id === params.id)
                        .map(patient => (
                            <div key={patient.id}>
                                <h2 className="text-xl font-semibold mb-4 text-blue-600">User Information</h2>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="p-3 bg-gray-50 rounded">
                                        <p><strong>Name:</strong> {patient.User.name}</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded">
                                        <p><strong>Age:</strong> {patient.User.age}</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded">
                                        <p><strong>Gender:</strong> {patient.User.gender}</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded">
                                        <p><strong>Symptoms:</strong> {patient.User.symptoms}</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded">
                                        <p><strong>Conditions:</strong> {patient.User.conditions}</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded">
                                        <p><strong>Medications:</strong> {patient.User.medications}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </>
            )}

        </div>
    );
}
