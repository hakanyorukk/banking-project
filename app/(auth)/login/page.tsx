import SignInForm from "@/components/SignInForm";

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sing In",
};

const page = () => {
  return (
    <section className="flex flex-col text-slate-50 sm:w-[30rem] w-full m-auto px-4">
      <div className="mb-6 flex flex-col">
        <h2 className="text-4xl font-bold">Sign In</h2>
      </div>
      <SignInForm type="sign-in" />
    </section>
  );
};

export default page;
