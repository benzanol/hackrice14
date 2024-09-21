import * as React from 'react';
import { useState } from 'react';
import './App.css';
import { RecurringSource } from './misc/AddSource';
import SummaryView from './summary/SummaryView';

export const RecurringContext = React.createContext<ReturnType<typeof useState>>(null);

const subs: RecurringSource[] = [
  {name: "Netflix", type: "subscriptions", period: "monthly", day: 1, amount: 10},
  {name: "Spotify", type: "subscriptions", period: "monthly", day: 1, amount: 4},
  {name: "NFL+",    type: "subscriptions", period: "monthly", day: 1, amount: 7},
];

function App() {
  const [recurring, setRecurring] = useState(subs)
  console.log('hi', recurring);

  return (
    <RecurringContext.Provider value={[recurring, setRecurring]}>
      {/* This div exists soley for the plus button to position itself relative to */}
      <div className="relative h-full w-[800px]">
        <div className="bg-gray-100 h-full w-full p-20 text-left overflow-scroll">
          <SummaryView recurring={recurring} setRecurring={setRecurring} />
        </div>
      </div>

    </RecurringContext.Provider>
  )
}

export default App
