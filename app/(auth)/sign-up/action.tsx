"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signup({ email, password, userData }: signUpProps) {
  const supabase = createClient();
  //console.log(email, password, userData);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  });

  //   type-casting here for convenience
  //   in practice, you should validate your inputs

  const { error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    console.error("Error:", error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
