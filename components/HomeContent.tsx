import Link from "next/link";
import React from "react";

const HomeContent = () => {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="p-4 mx-4 mt-6">
        <h1 className="text-5xl font-bold">
          Welcome,{" "}
          <span className="bg-gradient-to-l  from-teal-400 to-sky-600 text-transparent bg-clip-text">
            Hakan
          </span>
        </h1>
        <p className="text-lg">
          Access & manage your account and transactions efficiently.
        </p>
      </div>
      <div className="box-style h-60">
        <h2 className="box-title">Total Balance</h2>
      </div>
      <div className="box-style h-80">
        <h2 className="box-title">Money Analytics</h2>
      </div>
      <div className="box-style h-[80vh]">
        <div className="flex items-center justify-between">
          <h2 className="box-title">Recent Transactions</h2>
          <Link
            href="/transaction-history"
            className="bg-cyan-700 rounded-xl px-4 py-2"
          >
            View All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
