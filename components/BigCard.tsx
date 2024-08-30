import { formatAmount } from "@/lib/utils";
import React from "react";
import { FaCcVisa } from "react-icons/fa";

const BigCard = ({ account, user }: CardProps) => {
  return (
    <div className="flex flex-col justify-between h-60 bg-gradient-to-tl from-cyan-200 to-sky-500 w-96 rounded-2xl p-6 shadow-2xl shadow-slate-600 dark:shadow-slate-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-slate-200">
          {user.first_name} {user.last_name}
        </h2>
        <p className="text-slate-700 text-2xl font-semibold">
          {account?.bank_name}
        </p>
      </div>
      <div className="">
        <p className="text-slate-700 text-lg">{account?.number}</p>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-slate-700">
            {formatAmount(account?.balance)}
          </h2>
          <div>
            <FaCcVisa className="text-3xl text-slate-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigCard;
