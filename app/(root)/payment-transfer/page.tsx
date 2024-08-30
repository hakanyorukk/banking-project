import PaymentTransferForm from "@/components/PaymentTransferForm";
import { getAccountsInfo } from "@/lib/bank.actions";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Payment Transfer",
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
    <section className="h-full m-6 dark:bg-slate-800 bg-slate-50 rounded-[.5rem]">
      <div className="py-4 px-6 max-w-[75rem]">
        <h2 className="text-3xl font-bold py-2">Payment Transfer</h2>
        <p className="text-lg pb-4">
          Please provide any specific or notes related to the payment transfer
        </p>
        <h3 className="text-2xl font-semibold mt-2 py-2">Transfer details</h3>
        <p className="text-lg border-b dark:border-slate-600 border-slate-200 pb-2">
          Enter the details of the recipient
        </p>
        <PaymentTransferForm accounts={accounts as Account[]} userId={userID} />
      </div>
    </section>
  );
};

export default page;
