import UpdatePasswordForm from "@/components/UpdatePasswordForm";
import UpdateUserForm from "@/components/UpdateUserForm";
import { createClient } from "@/utils/supabase/server";

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Account",
};

const page = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  return (
    <section className="flex flex-col gap-12 text-slate-700 dark:text-slate-50 mt-10 px-4 mx-auto h-screen">
      <div className="max-w-[120rem] mx-auto flex flex-col gap-6">
        <h2 className="text-4xl font-semibold">Update your account</h2>
        {data?.user && (
          <div className="flex rounded-[0.5rem] dark:bg-slate-800 bg-slate-50 dark:border-slate-700 border-slate-200 border-2 mb-8">
            <UpdateUserForm user={data.user} />
          </div>
        )}
        <h2 className="text-4xl font-semibold">Update your password</h2>
        <div className="flex rounded-[0.5rem] dark:bg-slate-800 bg-slate-50 dark:border-slate-700 border-slate-200 border-2  ">
          <UpdatePasswordForm />
        </div>
      </div>
    </section>
  );
};

export default page;
