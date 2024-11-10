"use client";

import { ChartArea, User2 } from "lucide-react";
import * as React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const cardItems = [
  {
    title: "Patients",
    icon: User2,
    url: "/patients",
  },

  {
    title: "Charts",
    icon: ChartArea,
    url: "analytics",
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
      <Card className="h-[80vh] w-[35vw] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-blue-500">
        <CardHeader className="flex items-center justify-center p-14 h-full">
          <Icon className="w-20 h-16 mb-4 " />
          <CardTitle className="font-semibold">{title}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default function CardWithIcons() {
  return (
    <div className="flex items-center bg-gradient-to-b from-orange-200 to-orange-400   w-full justify-center">

      <div className="flex flex-row gap-5">
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
