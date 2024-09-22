import * as React from 'react';
import { useState } from 'react';
import './App.css';
import BudgetPage from './budget/BudgetPage';
import { RecurringSource } from './misc/AddSource';
import SummaryView from './summary/SummaryView';

export const RecurringContext = React.createContext<ReturnType<typeof useState>>(null);

const subs: RecurringSource[] = [
  {name: "Netflix", type: "subscriptions", period: "monthly", day: 1, amount: 10},
  {name: "Spotify", type: "subscriptions", period: "monthly", day: 1, amount: 4},
  {name: "NFL+",    type: "subscriptions", period: "monthly", day: 1, amount: 7},

  // {name: "Child Support", type: "bills", period: "monthly", day: 12, amount: 1200},
  {name: "Rent", type: "bills", period: "monthly", day: 12, amount: 800},
  {name: "Salary", type: "income", period: "yearly", day: 364, amount: 1000},
  // {name: "Tax Evasion", type: "income", period: "yearly", day: 100, amount: 6500},
];

// const subs: RecurringSource[] = [
//   {name: "Netflix", type: "subscriptions", period: "monthly", day: 1, amount: 10},
//   {name: "Spotify", type: "subscriptions", period: "monthly", day: 1, amount: 4},
//   {name: "NFL+",    type: "subscriptions", period: "monthly", day: 1, amount: 7},

  // {name: "Rent", type: "bills", period: "monthly", day: 1, amount: 750},
  // {name: "Elec", type: "bills", period: "monthly", day: 1, amount: 96},

  // {name: "Amazon", type: "subscriptions", period: "monthly", day: 1, amount: 8},
  // {name: "Spotify", type: "subscriptions", period: "yearly", day: 1, amount: 72},
// ]

function App() {
  const [recurring, setRecurring] = useState(subs)
  console.log('hi', recurring);

  return (
    <RecurringContext.Provider value={[recurring, setRecurring]}>
      {/* This div exists soley for the plus button to position itself relative to */}
      <div className="relative h-full w-[800px]">
        <div className="bg-gray-100 h-full w-full p-20 text-left overflow-scroll">
          {/* <SummaryView recurring={recurring} setRecurring={setRecurring} /> */}
          <BudgetPage recurring={recurring} />
        </div>
      </div>

    </RecurringContext.Provider>
  )
}

export default App
