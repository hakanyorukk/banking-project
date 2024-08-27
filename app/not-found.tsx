import Logo from "@/components/Logo";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "404",
};

const NotFound = () => {
  return (
    <main className="flex h-screen w-full justify-center items-center bg-slate-50">
      <div className="flex flex-col justify-center items-center gap-8 mb-40">
        <Logo />
        <p className="text-6xl">404</p>
        <h1 className="text-4xl">Oops! we can&apos;t find this page.</h1>
        <a
          href="/"
          className="inline-block bg-cyan-500 text-primary-800 px-6 py-3 text-xl text-slate-50 rounded-[0.25rem]"
        >
          Go back home
        </a>
      </div>
    </main>
  );
};

export default NotFound;
