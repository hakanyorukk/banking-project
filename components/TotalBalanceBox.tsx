import React from "react";
import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";

const TotalBalnceBox = ({
  accounts = [],
  totalCurrentBalance,
}: TotalBalanceBoxProps) => {
  return (
    <>
      <div className="box-style h-48 flex justify-center md:gap-10 sm:gap-2 basis-3/5">
        <div className="flex py-1 justify-center md:max-w-[40%] max-w-[50%] mr-6 md:mr-0">
          <DoughnutChart accounts={accounts} />
        </div>
        <div className="flex flex-col basis-1/2 justify-between">
          <h3 className="lg:text-3xl text-2xl font-medium xl:mt-2 mt-0 ">{`${accounts?.length} Bank Accounts`}</h3>
          <div className="xl:mt-10 lg:mt-6 mt-0 ">
            <p>Total Current Balance</p>
            <h1 className="lg:text-4xl sm:text-3xl text-2xl  xl:mt-3 mt-0 font-semibold">
              <AnimatedCounter amount={totalCurrentBalance} />
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalBalnceBox;
