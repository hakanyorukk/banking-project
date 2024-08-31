"use client";

import { Button } from "@/components/ui/button";

import { Form } from "@/components/ui/form";
import { SignupFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import CustomInput from "./CustomInput";
import { LuLoader2 } from "react-icons/lu";
import { useState } from "react";
import Link from "next/link";
import { signup } from "@/app/(auth)/sign-up/action";

const SignUpForm = ({ type }: { type: string }) => {
  const formSchema = SignupFormSchema(type);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  //1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // console.log(data);
    //setIsLoading(true);

    try {
      const userData: UserMetadata & User = {
        first_name: data.first_name!,
        last_name: data.last_name!,
        address: data.address!,
        city: data.city!,
        date_of_birth: data.date_of_birth!,
        postal_code: data.postal_code!,
        phone: "",
        state: "",
        email: "",
        userId: "",
        created_at: "",
        password: "",
        user_metadata: {} as UserMetadata,
      };
      // const userData = {
      //   first_name: data.first_name!,
      //   last_name: data.last_name!,
      //   address: data.address!,
      //   city: data.city!,
      //   postal_code: data.postal_code!,
      //   date_of_birth: data.date_of_birth!,
      // };
      const email = data.email;
      const password = data.password;
      console.log(email, password, userData);
      await signup({
        email,
        password,
        userData,
      });
      //setUser(newUser);
    } catch (error) {
      console.log(error);
    } finally {
      //setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-4">
            <CustomInput
              control={form.control}
              name="first_name"
              label="First Name"
              placeholder="Enter your first name"
            />
            <CustomInput
              control={form.control}
              name="last_name"
              label="Last Name"
              placeholder="Enter your first name"
            />
          </div>
          <CustomInput
            control={form.control}
            name="address"
            label="Address"
            placeholder="Enter your specific address"
          />
          <CustomInput
            control={form.control}
            name="city"
            label="City"
            placeholder="Enter your city"
          />
          <div className="flex gap-4">
            <CustomInput
              control={form.control}
              name="postal_code"
              label="Postal Code"
              placeholder="Example: 11101"
            />
            <CustomInput
              control={form.control}
              name="date_of_birth"
              label="Date of Birth"
              placeholder="YYYY-MM-DD"
            />
          </div>
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
                "Sign Up"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <footer className="flex justify-center gap-2 mt-2">
        <p className="text-md font-normal ">Already have an account?</p>
        <Link href="/login" className="text-md font-bold">
          Sign in
        </Link>
      </footer>
    </>
  );
};

export default SignUpForm;
