import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Wabaan",
  description: "Made By Rupin Munjal",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground ">

        {children}

      </body>
    </html>
  );
}
