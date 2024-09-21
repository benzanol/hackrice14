import * as React from 'react';
import { useState } from 'react';
import './App.css';
import AddSource, { RecurringSource } from './misc/AddSource';
import Navbar from './components/Navbar'
import Hero from './components/Hero'


export const RecurringContext = React.createContext<ReturnType<typeof useState>>(null);

const subs: RecurringSource[] = [
  {name: "Netflix", type: "subscriptions", period: "monthly", day: 1, amount: 10},
  {name: "Spotify", type: "subscriptions", period: "monthly", day: 1, amount: 4},
  {name: "NFL+",    type: "subscriptions", period: "monthly", day: 1, amount: 7},
];

const spendingData: Array<object> = [
  { name: 'Jan', spending: 60.0, fill: '#8884d8' },
  { name: 'Feb', spending: 59.0, fill: '#8884d8' },
  { name: 'Mar', spending: 110.0, fill: '#ee1010' },
  { name: 'Apr', spending: 81.0, fill: '#8884d8' },
  { name: 'May', spending: 56.0, fill: '#8884d8'},
  { name: 'Jun', spending: 55.0, fill: '#8884d8' },
  { name: 'Jul', spending: 40.0, fill: '#8884d8' },
  { name: 'Aug', spending: 20.0, fill: '#1f8f1f', },
  { name: 'Sep', spending: 38.0, fill: '#8884d8' },
  { name: 'Oct', spending: 39.0, fill: '#8884d8' },
  { name: 'Nov', spending: 48.0, fill: '#8884d8' },
  { name: 'Dec', spending: 38.0 , fill: '#8884d8' },
];

enum Tabs {
  Summary = "Summary", 
  AddSource = "AddSource",
  Spending = "Spending",
}

/*function App() {
  const [callback, setCallback] = useState<null | ((r: RecurringSource) => void)>(null);
  const [recurring, setRecurring] = useState(subs)
  const [spending, setSpending] = useState(spendingData)
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
    <RecurringContext.Provider value={[spendingData, setSpending]}>
      <div className="bg-gray-100 min-h-[100vh] w-[800px] p-20 text-left">
        <SpendingView spending={spendingData} ></SpendingView>
      </div>
    </RecurringContext.Provider>
  )

  switch (tab) {
    case Tabs.Summary:
      return sumView;
    case Tabs.AddSource:
      return sumView;
    case Tabs.Spending:
      return spendingSection;
  }
      */

function App() {
    return (
        <div>
            <Navbar />
            <Hero />
        </div>
    );
}

export default App;
