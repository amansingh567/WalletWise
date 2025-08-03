import React, { useState, useEffect } from "react";
import { useExpense } from "../context/ExpenseContext.jsx";
import TransactionChart from "./TransactionChart.jsx";
import TransactionFilters from "./TransactionFilters.jsx";
import MonthlyTrendsChart from "./MonthlyTrendsChart.jsx";
import { format } from "date-fns";

export default function DashBoard() {
  const { transactions, addTransaction } = useExpense();
  const [amount, setAmount] = useState("");
  const [filteredTxns, setFilteredTxns] = useState(transactions);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setFilteredTxns(transactions);
  }, [transactions]);

  const categories = [
    "Food", "Groceries", "Transport", "Rent", "Utilities",
    "Shopping", "Entertainment", "Health", "Travel", "Education",
    "Salary", "Freelance", "Investment", "Gift", "Others"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCategory || !amount) return;
    addTransaction({
      amount: +amount,
      category: selectedCategory,
      id: Date.now(),
      date: new Date().toDateString()
    });
    setSelectedCategory("");
    setAmount("");
  };

  const income = filteredTxns.filter(t => t.amount > 0).reduce((a, t) => a + t.amount, 0);
  const expense = filteredTxns.filter(t => t.amount < 0).reduce((a, t) => a + t.amount, 0);
  const balance = income + expense;

  return (
    <div className="mt-0 min-h-screen bg-gray-100 py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Expense Tracker</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side */}
          <div className="w-full md:basis-2/5 space-y-6">
            <div className="text-center">
              <h3 className="text-gray-600 uppercase text-sm">Balance</h3>
              <p className="text-4xl font-semibold text-gray-800">${balance.toFixed(2)}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-green-100 text-green-700 p-4 rounded">
                <h4 className="text-sm font-medium">Income</h4>
                <p className="text-xl font-bold">${income.toFixed(2)}</p>
              </div>
              <div className="bg-red-100 text-red-700 p-4 rounded">
                <h4 className="text-sm font-medium">Expense</h4>
                <p className="text-xl font-bold">${Math.abs(expense).toFixed(2)}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 border-b border-gray-200 pb-1">History</h3>
              <ul className="space-y-2 max-h-52 overflow-y-auto">
                {filteredTxns.map(txn => (
                  <li key={txn.id}
                    className={`flex justify-between items-center px-4 py-2 rounded-md ${
                      txn.amount < 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                    }`}
                  >
                    <span className="font-medium">{txn.category}</span>
                    <span className="font-bold">
                      {txn.amount < 0 ? "-" : "+"}${Math.abs(txn.amount).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-700">
                      {txn.date && !isNaN(new Date(txn.date)) &&
                        format(new Date(txn.date), "dd MMM yyyy")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 border-b border-gray-200 pb-1">Add Transaction</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <select
                  className="w-full border rounded px-3 py-2"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="" disabled>Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}> {category} </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="Amount"
                  className="w-full border rounded px-3 py-2"
                />
                <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded">
                  Add
                </button>
              </form>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-col ">
            <div>
              <TransactionFilters
                transactions={transactions}
                setTransactions={setFilteredTxns}
              />
              <TransactionChart income={income} expense={expense} />
            </div>
            <MonthlyTrendsChart transactions={filteredTxns} />
          </div>
        </div>
      </div>
    </div>
  );
}
