"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export type Person = {
  id: string;  // Add this
  name: string;
  age: number;
  gender: string;
  priority: string;
};

const personKeys: (keyof Person)[] = ["name", "age", "gender", "priority"];

const generateColumns = (keys: (keyof Person)[]): ColumnDef<Person>[] => {
  const avatarColumn: ColumnDef<Person> = {
    accessorKey: "avatarUrl",
    header: () => <div className="">Avatar</div>,
    cell: ({ row }) => {
      const avatarUrl = row.getValue("avatarUrl");
      return (
        <div className="flex">
          <Avatar>
            {avatarUrl ? (
              <img
                src={avatarUrl as string}
                alt={row.getValue("name") as string}
              />
            ) : (
              <AvatarFallback>
                {(row.getValue("name") as string)[0]}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      );
    },
  };

  const columns: ColumnDef<Person>[] = [avatarColumn];

  keys.forEach((key) => {
    columns.push({
      accessorKey: key,
      header: () => (
        <div className="text-left font-medium">
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </div>
      ),
      cell: ({ row }) => <div className="text-left">{row.getValue(key)}</div>,
    });
  });

  return columns;
};

export const columns: ColumnDef<Person>[] = generateColumns(personKeys);