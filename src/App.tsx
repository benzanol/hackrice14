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
import BudgetPage from './budget/BudgetPage';


const initialRecurringTransactions: RecurringSource[] = [
  {name: "Netflix", type: "subscriptions", period: "monthly", day: 1, amount: 10},
  {name: "Spotify", type: "subscriptions", period: "monthly", day: 5, amount: 4},
  {name: "NFL+",    type: "subscriptions", period: "monthly", day: 15, amount: 7},
  {name: "HEB",    type: "bills", period: "monthly", day: 12, amount: 7},
  {name: "Internships",    type: "income", period: "weekly", day: 3, amount: 7},
];

const transactionData: Transaction[] = [
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
        element: (
          <div className="flex h-full">
            <div className="grow p-10">
              <SpendingView />
            </div>
            <div className="grow h-full overflow-scroll p-10 bg-gray-100 min-w-[600px]">
              <Transactions />
            </div>
          </div>
        ),
      },
      {
        path: '/dashboard/main',
        element: (
          <div className="flex h-full">
            <div className="grow p-10">
              <SummaryView />
            </div>
            <div className="grow h-full overflow-scroll p-10 bg-gray-100 min-w-[600px]">
              <BudgetPage />
            </div>
          </div>
        ),
      },
      {
        path: '/dashboard/spending',
        element: <SpendingView />,
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

                      if (!localStorage.getItem("transactions")) {
                        localStorage.setItem("transactions", JSON.stringify(transactionData));
                      }

                      return (
                        <RecurringContext.Provider value={[recurring, setRecurring]}>
                          <RouterProvider router={router} />
                        </RecurringContext.Provider>
                      );
                    }

                    export default App;
