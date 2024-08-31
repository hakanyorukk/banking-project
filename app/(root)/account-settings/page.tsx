import UpdatePasswordForm from "@/components/UpdatePasswordForm";
import UpdateUserForm from "@/components/UpdateUserForm";
import { formatDateString } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Account",
};

const page = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  const last_sign_in = formatDateString(data?.user?.last_sign_in_at || "");

  return (
    <section className="flex flex-col text-slate-700 dark:text-slate-50 p-6 h-full">
      <div className="dark:bg-slate-800 bg-slate-50 dark:border-slate-700 border-slate-200 flex flex-col p-6 rounded-[.5rem]">
        <div className="max-w-[70rem]">
          <div className="flex justify-between pb-4 border-b dark:border-slate-600 border-slate-200">
            <h2 className="text-2xl font-semibold ">Update your account</h2>
            <p className="flex place-items-center text-sm">
              Last sign in at {last_sign_in}
            </p>
          </div>
          {data?.user && (
            <div className="fle dark:border-slate-700 border-slate-200 mb-6">
              <UpdateUserForm user={data.user.user_metadata as User} />
            </div>
          )}
          <h2 className="text-2xl font-semibold border-b dark:border-slate-600 border-slate-200 pb-4">
            Update your password
          </h2>
          <div className="flex">
            <UpdatePasswordForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
