"use server";

import { parseStringify } from "./utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "../utils/supabase/server";

// export const getUserInfo = async ({ userId }: getUserInfoProps) => {
//   try {
//     const { data, error } = await supabase
//       .from("user")
//       .select("*")
//       .eq("id", userId)
//       .single();

//     // For testing
//     //await new Promise((res) => setTimeout(res, 2000));
//     return data;
//   } catch (error) {
//     if (error) {
//       console.error(error);
//     }
//   }
// };

// export async function signIn({ email, password }: signInProps) {
//   try {
//     const supabase = createClient();
//     //assumed data alreadt validated
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     console.log(data);

//     if (error) {
//       console.log(error);
//       console.error("Error:", error);
//       //redirect("/error");
//     }

//     revalidatePath("/", "layout");
//     redirect("/");
//   } catch (error) {
//     console.error("Error:", error);
//     throw error; // Rethrow to handle errors in the caller function
//   }
// }

export async function getLoggedInUser() {
  const supabase = createClient();
  try {
    // Fetch the user information
    const { data: user, error: userError } = await supabase.auth.getUser();

    //return user;
    return parseStringify(user);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function signout() {
  try {
    const supabase = createClient();

    let { error } = await supabase.auth.signOut();

    if (error) throw error;

    revalidatePath("/", "layout");
    redirect("/login");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function updateUser({ user }: { user: User }) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.updateUser({
      data: user,
    });
    //console.log(user);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function updatePassword({ password }: { password: string }) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });
    //console.log("password");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
