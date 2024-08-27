"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const accountNames = accounts.map((a) => a.bank_name);
  const balances = accounts.map((a) => a.balance);
  console.log(balances);

  const data = {
    datasets: [
      {
        label: "Banks",
        data: balances,
        backgroundColor: ["#14b8a6", "#22d3ee", "#1d4ed8"],
      },
    ],
    labels: accountNames,
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutout: "60%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
