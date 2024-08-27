import React from "react";
import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";

const TotalBalnceBox = ({
  accounts = [],
  totalCurrentBalance,
}: TotalBalanceBoxProps) => {
  return (
    <>
      <div className="box-style h-60 flex basis-1/2">
        <div className="flex px-6 items-center">
          <DoughnutChart accounts={accounts} />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-3xl font-medium mt-4 mb-12">{`${accounts?.length} Bank Accounts`}</h3>
          <p>Total Current Balance</p>
          <h1 className="text-5xl mt-4 font-bold">
            <AnimatedCounter amount={totalCurrentBalance} />
          </h1>
        </div>
      </div>
    </>
  );
};

export default TotalBalnceBox;
