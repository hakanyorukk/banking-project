import SignUpForm from "@/components/SignUpForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sing Up",
};

const page = () => {
  return (
    <div className="flex flex-col my-auto text-slate-50 w-full md:max-w-[30rem] mx-auto p-6">
      <div className="mb-6 flex flex-col items-center">
        <h2 className="sm:text-4xl text-3xl mb-2 font-bold">
          Create an account
        </h2>
        <p className="sm:text-xl text-lg text-slate-200">
          Enter your information to get started
        </p>
      </div>
      <SignUpForm type="sign-up" />
    </div>
  );
};

export default page;
