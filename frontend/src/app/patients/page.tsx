import { Person, columns } from "./columns";
import { DataTable } from "./data-table";


async function getData(): Promise<Person[]> {
  // Mock data
  return [
    {
      id: "1",
      name: "John Smith",
      age: 45,
      gender: "Male",
      priority: "High",
    },
    {
      id: "2",
      name: "Emily Johnson",
      age: 32,
      gender: "Female",
      priority: "Medium",
    },
    {
      id: "3",
      name: "Michael Brown",
      age: 28,
      gender: "Male",
      priority: "Low",
    },
    {
      id: "4",
      name: "Sarah Wilson",
      age: 52,
      gender: "Female",
      priority: "High",
    },
    {
      id: "5",
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
    <div className="flex-1 flex justify-between w-full p-10">
      <div className="w-full">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
