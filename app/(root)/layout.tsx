import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex h-screen w-full font-lato">
      <SideBar />
      <div className="flex flex-col h-full w-full">
        <Header />
        <div className="flex-grow overflow-y-auto">{children}</div>
      </div>
    </main>
  );
}
