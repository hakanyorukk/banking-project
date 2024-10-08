"use client";

import { formatAmount } from "@/lib/utils";
import React, { useState } from "react";
import { FaCcVisa } from "react-icons/fa";

const Card = ({ account, user }: CardProps) => {
  return (
    <div className="h-40 bg-gradient-to-tl from-cyan-200 to-sky-500 w-full rounded-2xl p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-200">
          {user.first_name} {user.last_name}
        </h2>
        <p className="text-slate-700 text-xl font-semibold">
          {account?.bank_name}
        </p>
      </div>
      <div className="mt-12">
        <p className="text-slate-700">{account?.number}</p>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-700">
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

export default Card;
