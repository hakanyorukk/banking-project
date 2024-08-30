import React from "react";
import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";

const TotalBalnceBox = ({
  accounts = [],
  totalCurrentBalance,
}: TotalBalanceBoxProps) => {
  return (
    <>
      <div className="box-style h-48 flex basis-3/5">
        <div className="flex py-1 justify-center basis-1/2">
          <DoughnutChart accounts={accounts} />
        </div>
        <div className="flex flex-col basis-1/2">
          <h3 className="text-3xl font-medium mt-2 mb-10">{`${accounts?.length} Bank Accounts`}</h3>
          <p>Total Current Balance</p>
          <h1 className="text-4xl mt-3 font-semibold">
            <AnimatedCounter amount={totalCurrentBalance} />
          </h1>
        </div>
      </div>
    </>
  );
};

export default TotalBalnceBox;
