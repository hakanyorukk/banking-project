"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  PointElement,
  LinearScale,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  PointElement,
  LinearScale,
  LineElement
);

import {
  calculateMonthlyTotals,
  getMonthName,
  sortMonthNames,
} from "@/lib/utils";
import { useEffect, useState } from "react";

const LineChart = ({
  transactions = [],
  transactionsExpenses = [],
  transactionsIncomes = [],
}: TransactionsBoxProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
    // Listen for changes to the dark mode class
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDarkMode(document.documentElement.classList.contains("dark"));
        }
      });
    });

    // Observe changes to the class attribute of the document element
    observer.observe(document.documentElement, {
      attributes: true,
    });

    return () => observer.disconnect(); // Clean up the observer on unmount
  }, []);

  const colors = isDarkMode
    ? {
        expensesBorderColor: "#ef4444", // Red for expenses
        incomesBorderColor: "#22c55e",
        borderColor: "#22d3ee",
        backgroundColor: "#002079",
        labelColor: "#f8fafc",
        gridColor: "#334155",
      }
    : {
        expensesBorderColor: "#dc2626",
        incomesBorderColor: "#16a34a",
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "#04aabd",
        labelColor: "#0f172a",
        gridColor: "#e2e8f0",
      };

  const uniqueMonths = Array.from(
    new Set(transactions.map((a) => getMonthName(a.created_at)))
  );

  const totalAmount = calculateMonthlyTotals(transactions);
  const totalExpenses = calculateMonthlyTotals(transactionsExpenses);
  const totalIncomes = calculateMonthlyTotals(transactionsIncomes);
  const sorteduniqueMonths = sortMonthNames(uniqueMonths);

  const data = {
    labels: sorteduniqueMonths,
    datasets: [
      {
        label: "Expenses",
        data: totalExpenses.reverse(),
        borderColor: colors.expensesBorderColor,
        backgroundColor: colors.backgroundColor,
        tension: 0.4,
        fill: "start",
      },
      {
        label: "Incomes",
        data: totalIncomes.reverse(),
        borderColor: colors.incomesBorderColor,
        backgroundColor: colors.backgroundColor,
        tension: 0.4,
        fill: "start",
      },
    ],
  };
  return (
    <div className="flex w-full h-64  p-0 sm:p-4">
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          hover: { intersect: true },
          plugins: {
            legend: {
              display: false,
              labels: {},
            },
            filler: {
              propagate: true,
            },
          },
          scales: {
            x: {
              grid: {
                color: colors.gridColor,
              },
              ticks: {
                color: colors.labelColor,
                font: {
                  size: 14,
                },
              },
            },
            y: {
              ticks: {
                color: colors.labelColor,
                font: {
                  size: 14,
                },
              },
              grid: {
                color: colors.gridColor,
              },
            },
          },
        }}
      />
    </div>
  );
};
export default LineChart;
