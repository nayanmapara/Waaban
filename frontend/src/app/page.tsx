"use client";

import Image from "next/image";
import { CardWithIcons } from "@/app/dashboard/page";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full">
      {<CardWithIcons />}
    </div>
  );
}
