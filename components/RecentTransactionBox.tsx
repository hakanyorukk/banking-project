"use client";

import Link from "next/link";
import TransactionsHistory from "./TransactionsHistory";

const RecentTransactionBox = ({
  transactions,
  transactionsExpenses,
  transactionsIncomes,
}: TransactionsBoxProps) => {
  return (
    <section className="box-style h-fit">
      <div className="flex items-center justify-between  mb-6">
        <h2 className="box-title">Recent Transactions</h2>
        <Link
          href="/transaction-history"
          className="px-3 py-1 text-slate-100 form-button"
        >
          View All
        </Link>
      </div>
      <TransactionsHistory
        transactions={transactions}
        transactionsExpenses={transactionsExpenses}
        transactionsIncomes={transactionsIncomes}
      />
    </section>
  );
};

export default RecentTransactionBox;
