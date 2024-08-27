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

const LineChart = ({ transactions = [] }: LineChartProps) => {
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
        borderColor: "#22d3ee",
        backgroundColor: "#002079",
        labelColor: "#f8fafc",
        gridColor: "#334155",
      }
    : {
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "#04aabd",
        labelColor: "#0f172a",
        gridColor: "#e2e8f0",
      };

  const uniqueMonths = Array.from(
    new Set(transactions.map((a) => getMonthName(a.created_at)))
  );

  const totalAmount = calculateMonthlyTotals(transactions);
  const sorteduniqueMonths = sortMonthNames(uniqueMonths);

  console.log(sorteduniqueMonths);
  console.log(uniqueMonths);
  console.log(totalAmount);

  const data = {
    labels: sorteduniqueMonths,
    datasets: [
      {
        label: "Expense:",
        data: totalAmount.reverse(),
        borderColor: colors.borderColor,
        backgroundColor: colors.backgroundColor,
        tension: 0.4,
        fill: "start",
      },
    ],
  };
  return (
    <div className="flex w-full h-64 p-4">
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
                  size: 16,
                },
              },
            },
            y: {
              ticks: {
                color: colors.labelColor,
                font: {
                  size: 18,
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
