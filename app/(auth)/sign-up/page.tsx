import SignUpForm from "@/components/SignUpForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sing Up",
};

const page = () => {
  return (
    <div className="flex flex-col my-auto text-slate-50 max-w-[30rem] mx-auto p-6">
      <div className="mb-6 flex flex-col items-center">
        <h2 className="text-4xl font-bold">Create an account</h2>
        <p className="text-xl text-slate-200">
          Enter your information to get started
        </p>
      </div>
      <SignUpForm type="sign-up" />
    </div>
  );
};

export default page;
