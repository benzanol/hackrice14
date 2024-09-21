import * as React from 'react';
import { useState } from 'react';
import * as M from "@mui/material";
import './App.css';
import SetupPage from './misc/SetupPage';
import SummaryView from './summary/SummaryView';
import AddSource, { RecurringSource } from './misc/AddSource';
import SpendingView from './spendingGraph/SpendingView';

export const RecurringContext = React.createContext<ReturnType<typeof useState>>(null);

const subs: RecurringSource[] = [
  {name: "Netflix", type: "subscriptions", period: "monthly", day: 1, amount: 10},
  {name: "Spotify", type: "subscriptions", period: "monthly", day: 1, amount: 4},
  {name: "NFL+",    type: "subscriptions", period: "monthly", day: 1, amount: 7},
];


enum Tabs {
  Summary = "Summary", 
  AddSource = "AddSource",
  Spending = "Spending",
}

function App() {
  const [callback, setCallback] = useState<null | ((r: RecurringSource) => void)>(null);
  const [recurring, setRecurring] = useState(subs)
  const [tab, setTab] = useState(Tabs.Spending);

  console.log('hi', recurring);
  var sumView = (
    <RecurringContext.Provider value={[recurring, setRecurring]}>
      <div className="bg-gray-100 min-h-[100vh] w-[800px] p-20 text-left">
        <SummaryView recurring={recurring} setRecurring={setRecurring} />
      </div>

    </RecurringContext.Provider>
  )

  var spendingSection = (
    <div className="bg-gray-100 min-h-[100vh] w-[800px] p-20 text-left">
      <SpendingView ></SpendingView>
     </div> 
      
  )

  switch (tab) {
    case Tabs.Summary:
      return sumView;
    case Tabs.AddSource:
      return sumView;
    case Tabs.Spending:
      return spendingSection;
  }
}

export default App
