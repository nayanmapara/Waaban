"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export type Person = {
  id: string;
  name: string;
  age: number;
  gender: string;
  priority: string;
};

const personKeys: (keyof Person)[] = ["name", "age", "gender", "priority"];

const generateColumns = (keys: (keyof Person)[]): ColumnDef<Person>[] => {
  const avatarColumn: ColumnDef<Person> = {
    accessorKey: "avatarUrl",
    header: () => <div>Avatar</div>,
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
      cell: ({ row }) => {
        if (key === "priority") {
          const priority = row.getValue("priority") as string;
          const color = priority.toLowerCase() === "high" ? "bg-red-500" : priority.toLowerCase() === "low" ? "bg-green-500" : "bg-orange-500";
          return (
            <Badge className={`${color} text-white`}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Badge>
          );
        }
        return <div className="text-left">{row.getValue(key)}</div>;
      },
    });
  });

  return columns;
};

export const columns: ColumnDef<Person>[] = generateColumns(personKeys);
