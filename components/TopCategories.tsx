import { formatAmount } from "@/lib/utils";
import React from "react";

import { BiHealth } from "react-icons/bi";
import { RiBillLine } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { MdAirplanemodeActive, MdOutlineShoppingBag } from "react-icons/md";
import { TbSchool } from "react-icons/tb";
import { IoFastFoodOutline, IoGameControllerOutline } from "react-icons/io5";

interface Transaction {
  transaction_type: string;
  category_name: string;
  amount: number;
}

const TopCategories = ({ transactions }: { transactions: Transactions[] }) => {
  const totalExpensesByCategory = transactions.reduce<Record<string, number>>(
    (acc, transaction: Transaction) => {
      if (transaction.transaction_type === "Expense") {
        if (!acc[transaction.category_name]) {
          acc[transaction.category_name] = 0;
        }
        acc[transaction.category_name] += transaction.amount;
      }
      return acc;
    },
    {}
  );
  // Calculate total of all expenses
  const totalExpenses = Object.values(totalExpensesByCategory).reduce(
    (sum, amount) => sum + amount,
    0
  );

  // Convert to array, sort by amount, and calculate percentage
  const sortedTotalExpensesArray = Object.entries(totalExpensesByCategory)
    .sort(([, a], [, b]) => b - a)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: ((amount / totalExpenses) * 100).toFixed(2) + "%",
    }));

  return (
    <div>
      {sortedTotalExpensesArray.map((e, index) => (
        <div
          key={index}
          className="flex gap-3 w-full p-1.5 border-b  dark:border-slate-600 border-slate-200"
        >
          <div
            className={`text-2xl place-items-center flex ${
              e.category === "Transaction"
                ? "dark:text-blue-300 text-blue-500"
                : ""
            } ${
              e.category === "Shopping"
                ? "dark:text-pink-300 text-pink-500"
                : ""
            }${
              e.category === "Travel"
                ? "dark:text-purple-300 text-purple-500"
                : ""
            }${
              e.category === "Utilities & Bills"
                ? "dark:text-violet-200 text-violet-500"
                : ""
            }${
              e.category === "Education"
                ? "dark:text-green-300 text-green-500"
                : ""
            }${
              e.category === "Health & Wellness"
                ? "dark:text-red-300 text-red-500"
                : ""
            }${
              e.category === "Food and Drink"
                ? "dark:text-orange-300 text-orange-500"
                : ""
            } ${
              e.category === "Entertainment"
                ? "dark:text-teal-300 text-teal-500"
                : ""
            }`}
          >
            {e.category === "Transaction" ? <GrTransaction /> : ""}
            {e.category === "Shopping" ? <MdOutlineShoppingBag /> : ""}
            {e.category === "Travel" ? <MdAirplanemodeActive /> : ""}
            {e.category === "Utilities & Bills" ? <RiBillLine /> : ""}
            {e.category === "Education" ? <TbSchool /> : ""}
            {e.category === "Health & Wellness" ? <BiHealth /> : ""}
            {e.category === "Food and Drink" ? <IoFastFoodOutline /> : ""}
            {e.category === "Entertainment" ? <IoGameControllerOutline /> : ""}
          </div>
          <div className="w-full">
            <h3
              className={`text-lg  ${
                e.category === "Transaction"
                  ? "dark:text-blue-300 text-blue-500"
                  : ""
              } ${
                e.category === "Shopping"
                  ? "dark:text-pink-300 text-pink-500"
                  : ""
              }${
                e.category === "Travel"
                  ? "dark:text-purple-300 text-purple-500"
                  : ""
              }${
                e.category === "Utilities & Bills"
                  ? "dark:text-violet-200 text-violet-500"
                  : ""
              }${
                e.category === "Education"
                  ? "dark:text-green-300 text-green-500"
                  : ""
              }${
                e.category === "Health & Wellness"
                  ? "dark:text-red-300 text-red-500"
                  : ""
              }${
                e.category === "Food and Drink"
                  ? "dark:text-orange-300 text-orange-500"
                  : ""
              } ${
                e.category === "Entertainment"
                  ? "dark:text-teal-300 text-teal-500"
                  : ""
              }`}
            >
              {e.category}
            </h3>
            <div className="flex justify-between  ">
              <p>{e.percentage}</p>
              <p className="font-medium">{formatAmount(e.amount)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopCategories;
