import { formatAmount } from "@/lib/utils";
import React from "react";
import AnimatedCounter from "./AnimatedCounter";

const ExpensesMonth = ({
  totalExpenseMonth,
}: {
  totalExpenseMonth: number;
}) => {
  return (
    <div className="box-style flex flex-col h-48 w-full basis-1/3 place-items-center">
      <h2 className="box-title mt-4">Expenses this month</h2>
      <h3 className="text-4xl font-bold expense-color">
        <AnimatedCounter amount={totalExpenseMonth} />
      </h3>
    </div>
  );
};

export default ExpensesMonth;
