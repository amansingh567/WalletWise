import React, { useState, useEffect } from "react";
import { startOfWeek, startOfMonth, isWithinInterval } from "date-fns";

export default function TransactionFilters({ transactions, setTransactions }) {
  const [filter, setFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("both");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
  "All",
  "Food",
  "Groceries",
  "Transport",
  "Rent",
  "Utilities",
  "Shopping",
  "Entertainment",
  "Health",
  "Travel",
  "Education",
  "Salary",
  "Freelance",
  "Investment",
  "Gift",
  "Others"
];

  useEffect(() => {
    let result = transactions;
    const now = new Date();

    if (filter === "Today") {
      result = transactions.filter(t =>
        new Date(t.date).toDateString() === now.toDateString()
      );
    } 
    else if (filter === "Week") {
      result = transactions.filter(t =>
        isWithinInterval(new Date(t.date), { start: startOfWeek(now), end: now })
      );
    } 
    else if (filter === "Month") {
      result = transactions.filter(t =>
        isWithinInterval(new Date(t.date), { start: startOfMonth(now), end: now })
      );
    }

    result = result.filter((txn) => {
        if (typeFilter === "Both") return true;
        return typeFilter === "Income" ? txn.amount > 0 : txn.amount < 0;
        }
    )

    result = result.filter(txn =>{
      if(txn.category.length === 0 || selectedCategory === "All") return true;
      return txn.category === selectedCategory;
    })

    setTransactions(result);

  }, [filter, typeFilter,transactions, setTransactions, selectedCategory ,setSelectedCategory]);

  return (
    <div className="flex flex-wrap gap-3 mb-1">
      {["All", "Today", "Week", "Month"].map(f => (
        <button key={f} onClick={() => setFilter(f)}
          className={`px-3 py-1 rounded ${filter === f ? "bg-indigo-600 text-white" : "bg-gray-200"}`}>
          {f}
        </button>
      ))}
      {["Income", "Expense", "Both"].map(f => (
        <button key={f} onClick={() => setTypeFilter(f)}
          className={`px-3 py-1 rounded ${typeFilter === f ? "bg-indigo-600 text-white" : "bg-gray-200"}`}>
          {f}
        </button>
      ))}
      <select
        className="px-3 py-1 rounded bg-gray-200"
        value={selectedCategory}
        onChange={(e)=>setSelectedCategory(e.target.value)}
      >
        <option value="" disabled> Category </option>
        {categories.map((category, index) => (
          <option key={index} value={category}> {category} </option>
        ))}
      </select>

    </div>
  );
}
