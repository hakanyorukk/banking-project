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
    <Table>
      <TableHeader className="text-xl font-bold border-b border-slate-200 dark:border-slate-700 dark:bg-gray-900 bg-slate-200">
        <TableHead>Transaction</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Channel</TableHead>
        <TableHead>Category</TableHead>
      </TableHeader>
      <TableBody>
        {transactions?.map((t) => (
          <TableRow
            key={t.id}
            className="border-slate-200 dark:border-slate-700 text-md"
          >
            <TableCell>{t.transaction_name}</TableCell>
            <TableCell>
              {t.transaction_type === "Expense" ? (
                <div className="expense-color text-lg">
                  - {formatAmount(t.amount)}
                </div>
              ) : (
                <div className="income-color text-lg">
                  {formatAmount(t.amount)}
                </div>
              )}
            </TableCell>
            <TableCell>{t.status}</TableCell>
            <TableCell>{formatDateString(t.created_at)}</TableCell>
            <TableCell>{t.channel}</TableCell>
            <TableCell
              className={`font-semibold text-base ${
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
  );
};

export default TransactionsHistory;
