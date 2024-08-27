"use client";

import Link from "next/link";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { formatAmount, formatDateString } from "@/lib/utils";
import TransactionsHistory from "./TransactionsHistory";

const RecentTransactionBox = ({ transactions }: TransactionsBoxProps) => {
  return (
    <section className="box-style h-fit">
      <div className="flex items-center justify-between  mb-6">
        <h2 className="box-title">Recent Transactions</h2>
        <Link
          href="/transaction-history"
          className="bg-cyan-500 rounded-xl px-4 py-2 text-slate-100"
        >
          View All
        </Link>
      </div>
      <TransactionsHistory transactions={transactions} />
    </section>
  );
};

export default RecentTransactionBox;
