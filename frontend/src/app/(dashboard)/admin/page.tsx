"use client";

import { Calendar, ChartArea, Settings, User2 } from "lucide-react";
import * as React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const cardItems = [
  {
    title: "Patients",
    icon: User2,
    url: "/patients",
  },
  {
    title: "Appointments",
    icon: Calendar,
    url: "#",
  },
  {
    title: "Charts",
    icon: ChartArea,
    url: "analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "#",
  },
];

function CustomCard({
  icon: Icon,
  title,
  url,
}: {
  icon: React.ElementType;
  title: string;
  url: string;
}) {
  return (
    <Link href={url}>
      <Card className="h-[38vh] w-[35vw] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-blue-500">
        <CardHeader className="flex items-center p-14 h-full">
          <Icon className="w-20 h-16 mb-4" />
          <CardTitle className="font-semibold">{title}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default function CardWithIcons() {
  return (
    <div className="flex">
      <div className="grid grid-cols-2 gap-5">
        {cardItems.map((item, index) => (
          <CustomCard
            key={index}
            icon={item.icon}
            title={item.title}
            url={item.url}
          />
        ))}
      </div>
    </div>
  );
}
