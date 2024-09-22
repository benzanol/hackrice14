import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Sidebar from './Sidebar.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Transactions from './transactions/Transactions.tsx'
import SummaryView from './summary/SummaryView.tsx'
import { RecurringSource } from './misc/AddSource.tsx'
import SpendingView, { transactionToSpending } from './spendingGraph/SpendingView.tsx'
import { getLastMonthsTransactions, previousSixTransaction } from './utils.ts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
        element: <SummaryView recurring={[]} setRecurring={function (r: RecurringSource[]): void {
          throw new Error('Function not implemented.')
        } } />,
      },
      {
        path: '/dashboard/spending',
        element: <SpendingView spending={transactionToSpending(getLastMonthsTransactions(JSON.parse(localStorage.getItem("transactions") || "[]"), 6), 6, parseFloat(localStorage.getItem("goal")), parseFloat(localStorage.getItem("income")))} subgoal={parseFloat(localStorage.getItem("goal"))} income={parseFloat(localStorage.getItem("income"))} />,
      }
    ]
  },

]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
