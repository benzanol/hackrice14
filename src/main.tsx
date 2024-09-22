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
        element: <Transactions transactions={[]} />,
      },
      {
        path: '/dashboard/summary',
        element: <SummaryView recurring={[]} setRecurring={function (r: RecurringSource[]): void {
          throw new Error('Function not implemented.')
        } } />,
      }
    ]
  },

]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
