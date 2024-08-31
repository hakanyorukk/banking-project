import React from "react";
import TopCategories from "./TopCategories";

const MobileTopCategories = ({
  transactions = [],
}: {
  transactions: Transactions[];
}) => {
  return (
    <div className="box-style 2xl:hidden block">
      <div className="p-4">
        <h2 className="text-2xl mb-2 font-bold">Top Categories</h2>
        <TopCategories transactions={transactions} />
      </div>
    </div>
  );
};

export default MobileTopCategories;
