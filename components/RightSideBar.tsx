"use client";
import React, { useState } from "react";

import Card from "./Card";
import TopCategories from "./TopCategories";

const RightSideBar = ({
  user,
  accounts = [],
  transactions = [],
}: RightSideBarProps) => {
  const [activeCard, setActiveCard] = useState(1);
  return (
    <div className="sticky top-14 right-0 m-2 mx-4 ">
      <div className="">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold py-4">My card</h2>
          <button>+ Add card</button>
        </div>
        <div className=" flex relative h-44 mt-2">
          <Card account={accounts[activeCard - 1]} user={user} />
        </div>
        <div className="flex gap-3 justify-center w-full h-full">
          {accounts.map((a, index) => {
            return (
              <p
                className={`px-2 cursor-pointer  ${
                  activeCard === a.id
                    ? "text-cyan-500 border-slate-600 border-[1px] rounded-full"
                    : ""
                }`}
                key={index}
                onClick={() => setActiveCard(a.id)}
              >
                {a.id}
              </p>
            );
          })}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl mb-2 font-bold">Top Categories</h2>
        <TopCategories transactions={transactions} />
      </div>
    </div>
  );
};

export default RightSideBar;
