import React from "react";
import AnimatedCounter from "./AnimatedCounter";

const IncomesMonth = ({
  totatlIncomesMonth,
}: {
  totatlIncomesMonth: number;
}) => {
  return (
    <div className="box-style flex flex-col h-48 w-full basis-1/3 place-items-center">
      <h2 className="box-title mt-4">This months income</h2>
      <h3 className="text-4xl font-bold income-color">
        <AnimatedCounter amount={totatlIncomesMonth} />
      </h3>
    </div>
  );
};

export default IncomesMonth;
