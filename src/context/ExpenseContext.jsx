import { createContext, useContext } from "react";

export const ExpenseContext = createContext({
  transactions: [],
  addTransaction: () => {},
});

export const ExpenseProvider = ExpenseContext.Provider;

export const useExpense = () => useContext(ExpenseContext);
