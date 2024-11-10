// app/patients/[id]/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Updated Person type to match your needs
export type Person = {
  id: string;
  name: string;
  age: number;
  gender: string;
  priority: string;
  symptoms?: string;
  conditions?: string;
  medications?: string;
  diagnoses?: Array<{
    name: string;
    explanation: string;
    common_symptoms: string[];
    recommendations: string[];
  }>;
};

// Updated mock data with new structure
const mockData: Person[] = [
  {
    id: "1", // This will be overwritten by API data
    name: "API User",
    age: 0,
    gender: "Unknown",
    priority: "Unknown",
  },
  {
    id: "2",
    name: "John Smith",
    age: 45,
    gender: "Male",
    priority: "High",
    symptoms: "Fever and persistent cough for 3 days",
    conditions: "Asthma",
    medications: "Albuterol",
    diagnoses: [{
      name: "Acute Bronchitis",
      explanation: "Inflammation of the bronchial tubes, usually caused by a viral infection",
      common_symptoms: ["Coughing", "Fever", "Fatigue", "Chest discomfort"],
      recommendations: ["Rest", "Stay hydrated", "Use inhaler as prescribed", "Monitor symptoms"]
    }]
  },
  {
    id: "3",
    name: "Emily Johnson",
    age: 32,
    gender: "Female",
    priority: "Medium",
    symptoms: "Frequent headaches and blurred vision",
    conditions: "Migraine",
    medications: "Sumatriptan",
    diagnoses: [
      {
        name: "Migraine",
        explanation: "A neurological condition causing severe headaches and other symptoms",
        common_symptoms: ["Headache", "Nausea", "Sensitivity to light", "Blurred vision"],
        recommendations: ["Avoid triggers", "Take medication as prescribed", "Rest in a dark room"]
      }
    ]
  },
  {
    id: "4",
    name: "Michael Brown",
    age: 28,
    gender: "Male",
    priority: "Low",
    symptoms: "Mild sore throat and fatigue",
    conditions: "Seasonal Allergies",
    medications: "Loratadine",
    diagnoses: [
      {
        name: "Allergic Rhinitis",
        explanation: "An allergic reaction causing cold-like symptoms due to pollen or dust",
        common_symptoms: ["Sneezing", "Runny nose", "Sore throat", "Fatigue"],
        recommendations: ["Take antihistamines", "Limit outdoor exposure", "Stay hydrated"]
      }
    ]
  },
  {
    id: "5",
    name: "Sarah Wilson",
    age: 52,
    gender: "Female",
    priority: "High",
    symptoms: "Chest pain and shortness of breath",
    conditions: "Hypertension",
    medications: "Amlodipine",
    diagnoses: [
      {
        name: "Angina",
        explanation: "Chest pain due to reduced blood flow to the heart",
        common_symptoms: ["Chest pain", "Shortness of breath", "Fatigue", "Dizziness"],
        recommendations: ["Avoid heavy exertion", "Take medication as prescribed", "Monitor blood pressure"]
      }
    ]
  },
  {
    id: "6",
    name: "David Lee",
    age: 39,
    gender: "Male",
    priority: "Medium",
    symptoms: "Lower back pain and stiffness",
    conditions: "Chronic Back Pain",
    medications: "Ibuprofen",
    diagnoses: [
      {
        name: "Sciatica",
        explanation: "Pain along the sciatic nerve, often caused by compression",
        common_symptoms: ["Lower back pain", "Leg pain", "Numbness", "Tingling sensation"],
        recommendations: ["Exercise regularly", "Physical therapy", "Pain management"]
      }
    ]
  }
];

async function getPatientData(id: string): Promise<Person | null> {
  if (id === "1") {
    try {
      const response = await fetch("https://3769-198-96-35-117.ngrok-free.app/data");
      if (response.ok) {
        const data = await response.json();
        return {
          id: "1",
          name: data.User.name || "Unknown",
          age: parseInt(data.User.age || "0"),
          gender: data.User.gender || "Unknown",
          priority: data.Priority || "Unknown",
          symptoms: data.User.symptoms || "None",
          conditions: data.User.conditions || "None",
          medications: data.User.medications || "None",
          diagnoses: data.diagnoses || []
        };
      }
    } catch (error) {
      console.error('Error fetching patient:', error);
    }
  }
<<<<<<< HEAD
  
=======

>>>>>>> 638313b (landing page)
  return mockData.find(patient => patient.id === id) || null;
}

export default async function PatientPage({ params }: { params: { id: string } }) {
  const patient = await getPatientData(params.id);

  if (!patient) {
    return (
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Patients
            </Button>
          </Link>
        </div>
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">Patient not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
<<<<<<< HEAD
        <Link href="/">
=======
        <Link href="/admin">
>>>>>>> 638313b (landing page)
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Patients
          </Button>
        </Link>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl">
                  {patient.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <CardTitle className="text-2xl">{patient.name}</CardTitle>
<<<<<<< HEAD
                <Badge 
                  className={`${
                    patient.priority.toLowerCase() === "high" 
                      ? "bg-red-500" 
                      : patient.priority.toLowerCase() === "low" 
                      ? "bg-green-500" 
                      : "bg-orange-500"
                  } text-white`}
=======
                <Badge
                  className={`${patient.priority.toLowerCase() === "high"
                    ? "bg-red-500"
                    : patient.priority.toLowerCase() === "low"
                      ? "bg-green-500"
                      : "bg-orange-500"
                    } text-white`}
>>>>>>> 638313b (landing page)
                >
                  {patient.priority}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-medium">{patient.age} years</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Gender</p>
                <p className="font-medium">{patient.gender}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Patient ID</p>
                <p className="font-medium">{patient.id}</p>
              </div>
            </div>

            {/* Medical Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Current Symptoms</h3>
                <p className="text-sm">{patient.symptoms}</p>
              </div>
<<<<<<< HEAD
              
=======

>>>>>>> 638313b (landing page)
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Existing Conditions</h3>
                  <p className="text-sm">{patient.conditions}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Current Medications</h3>
                  <p className="text-sm">{patient.medications}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Diagnoses Section */}
        {patient.diagnoses && patient.diagnoses.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Diagnosis & Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {patient.diagnoses.map((diagnosis, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="font-semibold text-lg">{diagnosis.name}</h3>
                  <p className="text-sm">{diagnosis.explanation}</p>
<<<<<<< HEAD
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Common Symptoms</h4>
                    <ul className="list-disc list-inside text-sm">
                      {diagnosis.common_symptoms.map((symptom, idx) => (
                        <li key={idx}>{symptom}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
=======

                  <div className="space-y-2">
                    <h4 className="font-medium">Common Symptoms</h4>
                    <ul className="list-disc list-inside text-sm">
                      {diagnosis.common_symptoms.map((symptom, idx) => (
                        <li key={idx}>{symptom}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
>>>>>>> 638313b (landing page)
                    <h4 className="font-medium">Recommendations</h4>
                    <ul className="list-disc list-inside text-sm">
                      {diagnosis.recommendations.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}