import { Person, columns } from "./columns";
import { DataTable } from "./data-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";


async function fetchDataFromAPI(): Promise<Person[] | null> {
    try {
        const response = await fetch("https://3769-198-96-35-117.ngrok-free.app/data");
        if (!response.ok) throw new Error("Failed to fetch data from API");

        const data = await response.json();

        // Map API data to Person format
        return [
            {
                id: "1",
                name: data.User.name || "Unknown",
                age: parseInt(data.User.age || "0"),
                gender: data.User.gender || "Unknown",
                priority: data.Priority || "Unknown",
            },
        ];
    } catch (error) {
        console.error("Error fetching data from API:", error);
        return null;
    }
}

async function getData(): Promise<Person[]> {
    // Attempt to fetch data from API
    const apiData = await fetchDataFromAPI();

    // Return API data if available, otherwise return mock data
    return [
        ...(apiData || []),
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
}

export default async function DemoPage() {
    const data = await getData();
    return (
        <div className="flex-1 flex-col justify-between w-full p-10  bg-gradient-to-b from-orange-200 to-orange-400 ">
            <div className="mb-6 h-12 " >
                <Link href="/">
                    <Button variant="ghost" className="gap-2 rounded-md bg-orange-400">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Patients
                    </Button>
                </Link>
            </div>
            <div className="w-full">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
}