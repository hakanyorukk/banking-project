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
            <TableCell>{t.category_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionsHistory;
