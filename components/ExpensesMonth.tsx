import { formatAmount } from "@/lib/utils";
import React from "react";
import AnimatedCounter from "./AnimatedCounter";

const ExpensesMonth = ({
  totalExpenseMonth,
}: {
  totalExpenseMonth: number;
}) => {
  return (
    <div className="box-style flex flex-col h-48 basis-1/3 place-items-center">
      <h2 className="box-title md:mt-4 mt-0">Expenses this month</h2>
      <h3 className="md:text-4xl text-3xl font-bold expense-color">
        <AnimatedCounter amount={totalExpenseMonth} />
      </h3>
    </div>
  );
};

export default ExpensesMonth;
