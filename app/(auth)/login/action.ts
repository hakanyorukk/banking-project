"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login({ email, password }: signInProps) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    const errorMessage = { message: "Invalid login credentials." };
    console.error("Error:", error);
    //redirect("/error");
    return errorMessage;
  }

  revalidatePath("/", "layout");
  redirect("/");
}
