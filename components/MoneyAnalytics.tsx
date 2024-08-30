import React from "react";
import LineChart from "./LineChart";

const MoneyAnalytics = ({
  transactions,
  transactionsExpenses,
  transactionsIncomes,
}: TransactionsBoxProps) => {
  return (
    <div className="box-style h-80">
      <h2 className="box-title">Money Analytics</h2>
      <div>
        <LineChart
          transactions={transactions}
          transactionsExpenses={transactionsExpenses}
          transactionsIncomes={transactionsIncomes}
        />
      </div>
    </div>
  );
};

export default MoneyAnalytics;
