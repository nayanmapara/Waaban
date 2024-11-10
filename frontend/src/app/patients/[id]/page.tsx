// app/patients/[id]/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Person } from "../columns" // Adjust this import path based on your file structure
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock data that matches your page.tsx data
const mockData: Person[] = [
  {
    id: "1", // This will match the API data
    name: "API User", // Will be overwritten by API data if id is "1"
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
  },
  {
    id: "3",
    name: "Emily Johnson",
    age: 32,
    gender: "Female",
    priority: "Medium",
  },
  {
    id: "4",
    name: "Michael Brown",
    age: 28,
    gender: "Male",
    priority: "Low",
  },
  {
    id: "5",
    name: "Sarah Wilson",
    age: 52,
    gender: "Female",
    priority: "High",
  },
  {
    id: "6",
    name: "David Lee",
    age: 39,
    gender: "Male",
    priority: "Medium",
  },
];

async function getPatientData(id: string): Promise<Person | null> {
  // If the ID is "1", try to fetch from API
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
        };
      }
    } catch (error) {
      console.error('Error fetching patient:', error);
    }
  }
  
  // If API fetch fails or ID is not "1", look for the patient in mock data
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
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Patients
          </Button>
        </Link>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">
                {patient.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <CardTitle className="text-2xl">{patient.name}</CardTitle>
              <Badge 
                className={`${
                  patient.priority.toLowerCase() === "high" 
                    ? "bg-red-500" 
                    : patient.priority.toLowerCase() === "low" 
                    ? "bg-green-500" 
                    : "bg-orange-500"
                } text-white`}
              >
                {patient.priority}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
        </CardContent>
      </Card>
    </div>
  )
}