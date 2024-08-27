"use client";

import React, { useState } from "react";
import { Form } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignupFormSchema } from "@/lib/utils";
import { z } from "zod";
import CustomInput from "./CustomInput";
import { Button } from "./ui/button";
import { LuLoader2 } from "react-icons/lu";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { login } from "@/app/(auth)/login/action";

const SignInForm = ({ type }: { type: string }) => {
  const formSchema = SignupFormSchema(type);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  //1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "text@test.com",
      password: "test1234",
    },
  });

  //2. Define a submit handler.

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await login({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
          {" "}
          <CustomInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
          />
          <CustomInput
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
          />
          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="form-button hover:bg-cyan-500"
            >
              {isLoading ? (
                <>
                  <LuLoader2 size={20} className="animate-spin" /> &nbsp;
                  Loading...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <footer className="flex justify-center gap-2 mt-2">
        <p className="text-md font-normal ">Don&apos;t you have an account?</p>
        <Link href="/sign-up" className="text-md font-bold">
          Sign Up
        </Link>
      </footer>
    </>
  );
};

export default SignInForm;
