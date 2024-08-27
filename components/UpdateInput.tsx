import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { UpdateFormSchema } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

const type = "account";
const formSchema = UpdateFormSchema(type);

interface UpdateInput {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  disabled?: boolean;
}

const UpdateInput = ({
  control,
  name,
  label,
  placeholder,
  disabled,
}: UpdateInput) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-grow place-items-center w-full py-4 pr-12 ">
          <FormLabel className="text-xl flex w-[17rem]">{label}</FormLabel>
          <div className="flex flex-col w-full">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="text-xl dark:text-slate-300 text-slate-600  rounded-[.25rem] inline-block h-full max-w-[30rem]"
                type={name === "password" ? "password" : "text"}
                {...field}
                disabled={disabled === true ? disabled : false}
              />
            </FormControl>
            <FormMessage className="text-red-500 mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default UpdateInput;
