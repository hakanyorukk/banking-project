import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

import React from "react";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  //const loggedIn = await getLoggedInUser();

  return (
    <main className="flex w-full font-lato">
      <SideBar />
      <div className="flex flex-col h-full w-full">
        <Header />
        <div className="">{children}</div>
      </div>
    </main>
  );
}
