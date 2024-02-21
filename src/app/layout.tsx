import type { Metadata } from "next";

import "./globals.css";
import SideBar from "@/components/SideBar";
import SideNotes from "@/components/SideNotes";

export const metadata: Metadata = {
  title: "Notes App",
  description: "manage your notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex">
        <SideBar />
        <SideNotes />
        <main className="bg-slate-800 min-h-screen w-full flex">
          {children}
        </main>
      </body>
    </html>
  );
}
