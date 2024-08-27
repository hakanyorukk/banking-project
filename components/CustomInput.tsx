import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { SignupFormSchema } from "@/lib/utils";

const formSchema = SignupFormSchema("sign-up");

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}

const CustomInput = ({ control, name, label, placeholder }: CustomInput) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="">
          <FormLabel className="text-lg">{label}</FormLabel>
          <div className="flex w-full flex-col ">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="text-md text-slate-900 input-class backdrop-blur-3xl bg-slate-100 rounded-[.25rem]"
                type={name === "password" ? "password" : "text"}
                {...field}
              />
            </FormControl>
            <FormMessage className="text-red-500 mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
