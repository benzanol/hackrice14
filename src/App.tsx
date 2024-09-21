import * as React from 'react';
import { useState } from 'react';
import * as M from "@mui/material";
import './App.css';
import SetupPage from './misc/SetupPage';
import SummaryView from './summary/SummaryView';
import AddSource, { RecurringSource } from './misc/AddSource';

export const RecurringContext = React.createContext<ReturnType<typeof useState>>(null);

const subs: RecurringSource[] = [
  {name: "Netflix", type: "subscriptions", period: "monthly", day: 1, amount: 10},
  {name: "Spotify", type: "subscriptions", period: "monthly", day: 1, amount: 4},
  {name: "NFL+",    type: "subscriptions", period: "monthly", day: 1, amount: 7},
];

function App() {
  const [callback, setCallback] = useState<null | ((r: RecurringSource) => void)>(null);
  const [recurring, setRecurring] = useState(subs)
  console.log('hi', recurring);

  return (
    <RecurringContext.Provider value={[recurring, setRecurring]}>
      <div className="bg-gray-100 min-h-[100vh] w-[800px] p-20 text-left">
        <SummaryView recurring={recurring} setRecurring={setRecurring} />
      </div>

    </RecurringContext.Provider>
  )
}

export default App
