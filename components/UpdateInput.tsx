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
        <div className="flex flex-grow place-items-center w-full py-3 border-b dark:border-slate-600 border-slate-200">
          <FormLabel className="sm:text-lg text-xs flex basis-2/5 mr-4">
            {label}
          </FormLabel>
          <div className="flex flex-col w-full">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="sm:text-md text-xs form-input"
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
