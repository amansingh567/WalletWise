import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

export default function MonthlyTrendsChart({ transactions }) {
  // Step 2: Aggregate income and expense by month
  const monthlyData = {};
  
  transactions.forEach((txn) => {
    const txnDate = new Date(txn.date);
    if (isNaN(txnDate)) return;
    
    const month = format(txnDate, "MM-yyyy");

    if (!monthlyData[month]) {
      monthlyData[month] = { month, income: 0, expense: 0 };
    }

    if (txn.amount > 0) {
      monthlyData[month].income += txn.amount;
    } else {
      monthlyData[month].expense += Math.abs(txn.amount);
    }
  });

  const chartData = Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));

  return (
    <div className="p-10  bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-4 text-center">Monthly Income vs Expense</h3>
      <ResponsiveContainer width="60%" height={240}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#10b981" name="Income" />
          <Bar dataKey="expense" fill="#ef4444" name="Expense" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
