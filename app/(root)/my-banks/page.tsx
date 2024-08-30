import BigCard from "@/components/BigCard";
import { getAccountsInfo } from "@/lib/bank.actions";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
export const metadata: Metadata = {
  title: "My Banks",
};

const page = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  const userID = data.user.id;
  const accounts = await getAccountsInfo({ userId: userID });
  return (
    <section className="p-12">
      <div>
        <h1 className="text-4xl font-bold mb-2">My Bank Accounts</h1>
        <p className="text-lg">Effortlessly Manage Your Banking Activities</p>
        <h3 className="mt-6 text-2xl font-bold mb-4">Your cards</h3>
      </div>
      <div className="flex gap-8">
        {accounts?.map((account, index) => (
          <BigCard
            key={index}
            account={account}
            user={data.user.user_metadata as User}
          />
        ))}
      </div>
    </section>
  );
};

export default page;
