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

const TransactionsHistory = ({ transactions }: TransactionsBoxProps) => {
  return (
    <section>
      <Table>
        <TableHeader className="sm:text-xl text-sm font-bold border-b border-slate-200 dark:border-slate-700 dark:bg-gray-900 bg-slate-200">
          <TableHead>Transaction</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="hidden md:block">Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="hidden sm:block">Channel</TableHead>
          <TableHead>Category</TableHead>
        </TableHeader>
        <TableBody className="sm:text-base text-xs">
          {transactions?.map((t) => (
            <TableRow
              key={t.id}
              className="border-slate-200 dark:border-slate-700 sm:text-md text-sm"
            >
              <TableCell className="sm:text-lg text-xs">
                {t.transaction_name}
              </TableCell>
              <TableCell className="sm:text-lg text-xs">
                {t.transaction_type === "Expense" ? (
                  <div className="expense-color ">
                    - {formatAmount(t.amount)}
                  </div>
                ) : (
                  <div className="income-color">{formatAmount(t.amount)}</div>
                )}
              </TableCell>
              <TableCell className="hidden md:block">{t.status}</TableCell>
              <TableCell className="sm:text-lg text-xs">
                {formatDateString(t.created_at)}
              </TableCell>
              <TableCell className="hidden sm:block">{t.channel}</TableCell>
              <TableCell
                className={`sm:font-semibold font-medium sm:text-base text-xs${
                  t.category_name === "Transaction"
                    ? "dark:text-blue-300 text-blue-500"
                    : ""
                } ${
                  t.category_name === "Shopping"
                    ? "dark:text-pink-300 text-pink-500"
                    : ""
                }${
                  t.category_name === "Travel"
                    ? "dark:text-purple-300 text-purple-500"
                    : ""
                }${
                  t.category_name === "Utilities & Bills"
                    ? "dark:text-violet-200 text-violet-500"
                    : ""
                }${
                  t.category_name === "Education"
                    ? "dark:text-green-300 text-green-500"
                    : ""
                }${
                  t.category_name === "Health & Wellness"
                    ? "dark:text-red-300 text-red-500"
                    : ""
                }${
                  t.category_name === "Food and Drink"
                    ? "dark:text-orange-300 text-orange-500"
                    : ""
                } ${
                  t.category_name === "Entertainment"
                    ? "dark:text-teal-300 text-teal-500"
                    : ""
                }`}
              >
                {t.category_name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default TransactionsHistory;
