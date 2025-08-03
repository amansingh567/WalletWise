import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);//Activates the necessary components that Doughnut charts depend on.
//ArcElement -> Renders the arc shapes used in Doughnut 
//Tooltip -> Without it, hovering won’t display values
//Legend -> Displays the label-color mapping (i.e., the legend) 

export default function TransactionChart({ income, expense }) {
  const data = {
    labels: ["Income", "Expense"],
    datasets: [{
      data: [income, Math.abs(expense)],
      backgroundColor: ['#4ade80', '#f87171'],
      borderColor: ['#16a34a', '#dc2626'],
      borderWidth: 2,
    }],
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-center">Income vs Expense</h2>
      <Doughnut data={data} 
        options={{ responsive: false, maintainAspectRatio: false }}
        width={280}
        height={280}
      />
    </div>
  );
}
