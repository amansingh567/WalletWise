import React, { useEffect, useState } from "react";
import { ExpenseProvider } from "./context/ExpenseContext";
import DashBoard from "./components/DashBoard.jsx";

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(saved);
  }, []);

  const addTransaction = (txn) => {
    const updated = [{ ...txn }, ...transactions];
    localStorage.setItem("transactions", JSON.stringify(updated));
    setTransactions(updated);
  };

  return (
    <ExpenseProvider value={{ transactions, addTransaction }}>
      <DashBoard />
    </ExpenseProvider>
  );
}

export default App;
