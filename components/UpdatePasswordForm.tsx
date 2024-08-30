"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { PasswordFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LuLoader2 } from "react-icons/lu";
import { z } from "zod";
import { Button } from "./ui/button";
import { updatePassword } from "@/lib/user.actions";

const UpdatePasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  //const type = "account";
  //const formSchema = UpdateFormSchema(type);
  const formSchema = PasswordFormSchema();

  //1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await updatePassword({
        password: data.password,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[50%] ">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <div className="flex flex-grow place-items-center w-full py-4">
                <FormLabel className="text-lg flex mr-4  basis-3/5">
                  New Password
                </FormLabel>
                <div className="flex flex-col w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter new password"
                      className="form-input text-lg"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-2" />
                </div>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <div className="flex flex-grow place-items-center  w-full py-4 ">
                <FormLabel className="text-lg flex mr-4 basis-3/5 ">
                  Confirm Password
                </FormLabel>
                <div className="flex flex-col w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter confirm password"
                      className="form-input text-lg"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-2" />
                </div>
              </div>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="form-button hover:bg-cyan-500 text-slate-50"
          >
            {isLoading ? (
              <>
                <LuLoader2 size={20} className="animate-spin" /> &nbsp;
                Loading...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UpdatePasswordForm;
