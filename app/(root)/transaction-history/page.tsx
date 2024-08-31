import {
  getTransactionsAll,
  getTransactionsSelected,
} from "@/lib/bank.actions";

import { Metadata } from "next";
import React from "react";
import Filter from "@/components/Filter";
import TransactionsHistory from "@/components/TransactionsHistory";
import PaginationBox from "@/components/Pagination";
import { PAGE_SIZE } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Transaction History",
};

const page = async ({ searchParams }: { searchParams: any }) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  const userID = data.user.id;
  console.log(userID);
  const filter = searchParams?.date ?? "all";
  const page = searchParams?.page ?? 1;
  const transactionsHistory = await getTransactionsSelected({
    userId: userID,
    filter,
    page,
  });
  const transactions = await getTransactionsAll({ userId: userID });
  const totalPages = Math.ceil((transactions?.length ?? 0) / PAGE_SIZE);

  return (
    <section className="mx-14 mt-6 mb-4 overflow-y-hidden">
      <div className="flex items-center justify-between mb-2">
        <h2 className="box-title">Transactions History</h2>
        <Filter />
      </div>
      <div className="rounded-[0.5rem] dark:bg-slate-800 bg-slate-50 dark:border-slate-700 border-slate-200 border-2 overflow-hidden">
        <TransactionsHistory
          transactions={transactionsHistory as Transactions[]}
          transactionsExpenses={[]}
          transactionsIncomes={[]}
        />
      </div>
      <PaginationBox totalPages={totalPages} />
    </section>
  );
};

export default page;
