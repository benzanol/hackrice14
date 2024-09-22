import * as React from 'react';
import { useState } from 'react';
import './App.css';

import {
  createBrowserRouter, RouterProvider
} from "react-router-dom";
import Calendar from './components/Calendar';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import './index.css';
import Launcher from './launcher/Launcher';
import { RecurringSource, Transaction } from './misc/AddSource';
import Sidebar from './Sidebar';
import SpendingView, { SpendingBarData, transactionToSpending } from './spendingGraph/SpendingView';
import SummaryView from './summary/SummaryView';
import Transactions from './transactions/Transactions';
import { getLastMonthsTransactions } from './utils';
import BudgetPage from './budget/BudgetPage';


const initialRecurringTransactions: RecurringSource[] = [
  {name: "Netflix", type: "subscriptions", period: "monthly", day: 1, amount: 10},
  {name: "Spotify", type: "subscriptions", period: "monthly", day: 5, amount: 4},
  {name: "NFL+",    type: "subscriptions", period: "monthly", day: 15, amount: 7},
  {name: "HEB",    type: "bills", period: "monthly", day: 12, amount: 7},
  {name: "Internships",    type: "income", period: "weekly", day: 3, amount: 7},
];

const spendingData: SpendingBarData[] = [
  { name: 'Jan', spending: 60.0 },
  { name: 'Feb', spending: 59.0 },
  { name: 'Mar', spending: 110.0 },
  { name: 'Apr', spending: 81.0 },
  { name: 'May', spending: 56.0 },
  { name: 'Jun', spending: 55.0 },
  { name: 'Jul', spending: 40.0 },
  { name: 'Aug', spending: 20.0 },
  { name: 'Sep', spending: 38.0 },
  { name: 'Oct', spending: 39.0 },
  { name: 'Nov', spending: 48.0 },
  { name: 'Dec', spending: 38.0 },
];

const transactionData: Transaction[] = [
  {name: "HEB", amount: 10.43, date: new Date("2024-09-20"), vendor: "HEB"},
  {name: "Fuzzy", amount: 7.84, date: new Date("2024-09-20"), vendor: "Fuzzy's"},
  {name: "Fuzzy", amount: 7.84, date: new Date("2024-09-20"), vendor: "Fuzzy's"},
  {name: "Fuzzy", amount: 7.84, date: new Date("2024-09-20"), vendor: "Fuzzy's"},
  {name: "Fuzzy", amount: 7.84, date: new Date("2024-09-20"), vendor: "Fuzzy's"},
  {name: "Steam Deck", amount: 592.60, date: new Date("2024-04-20"), vendor: "Valve"},
  {name: "Ladle", amount: 10.56, date: new Date("2024-06-20"), vendor: "Valve"}
];


const router = createBrowserRouter([
  {
    path: '/',
    element: <Launcher />,
  },
  {
    path: '/dashboard',
    element: <Sidebar />,
    children: [
      {
        path: '/dashboard/transactions',
        element: <Transactions transactions={JSON.parse(localStorage.getItem("transactions")  || "[]")} />,
      },
      {
        path: '/dashboard/main',
        element: <SummaryView />,
      },
      {
        path: '/dashboard/spending',
        element: <SpendingView
                   spending={
                     transactionToSpending(
                       getLastMonthsTransactions(JSON.parse(localStorage.getItem("transactions" || "[]")), 6),
                       6,
                       parseFloat(localStorage.getItem("goal")),
                       parseFloat(localStorage.getItem("income")),
                     )
                   }
                   subgoal={parseFloat(localStorage.getItem("goal"))}
                   income={parseFloat(localStorage.getItem("income"))}
                 />,
      },
      {
        path: '/dashboard/budgeting',
        element: <BudgetPage />,
      },
      {
        path: '/dashboard/calendar',
        element: <Calendar />,
      },
    ]
  },
]);


export type GetSet<T> = [T, (e: T) => void]
export const RecurringContext = React.createContext<GetSet<RecurringSource[]>>(null);

function App() {
  const [recurring, setRecurring] = useState(initialRecurringTransactions);

  return (
    <RecurringContext.Provider value={[recurring, setRecurring]}>
      <RouterProvider router={router} />
    </RecurringContext.Provider>
  );
}

export default App;
