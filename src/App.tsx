import * as React from 'react';
import { useState } from 'react';
import './App.css';
import SummaryView from './summary/SummaryView';
import AddSource, { RecurringSource, Transaction } from './misc/AddSource';
import SpendingView, { SpendingBarData, transactionToSpending } from './spendingGraph/SpendingView';
import { getLastMonthsTransactions } from './utils';
import Transactions from './transactions/Transactions';

export const RecurringContext = React.createContext<ReturnType<typeof useState>>(null);

const subs: RecurringSource[] = [
  {name: "Netflix", type: "subscriptions", period: "monthly", day: 1, amount: 10},
  {name: "Spotify", type: "subscriptions", period: "monthly", day: 1, amount: 4},
  {name: "NFL+",    type: "subscriptions", period: "monthly", day: 1, amount: 7},
];

const spendingData: Array<SpendingBarData> = [
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


enum Tabs {
  Summary = "Summary", 
  AddSource = "AddSource",
  Spending = "Spending",
  Transactions = "Transactions",
}

function App() {
  const [recurring, setRecurring] = useState(subs)
  const [spending, setSpending] = useState(spendingData)
  const [tab, setTab] = useState(Tabs.Transactions);

  var sumView = (
    <RecurringContext.Provider value={[recurring, setRecurring]}>
      {/* This div exists soley for the plus button to position itself relative to */}
      <div className="relative h-full w-[800px]">
        <div className="bg-gray-100 h-full w-full p-20 text-left overflow-scroll">
          <SummaryView recurring={recurring} setRecurring={setRecurring} />
        </div>
      </div>

    </RecurringContext.Provider>
  )

  var transactionSection = (
    <RecurringContext.Provider value={[transactionData, setSpending]}>
      <div className="bg-gray-100 min-h-[100vh] w-[800px] p-20 text-left">
        <Transactions transactions={transactionData}  ></Transactions>
      </div>
    </RecurringContext.Provider>
  )

  var spendingSection = (
    <RecurringContext.Provider value={[spendingData, setSpending]}>
      <div className="bg-gray-100 min-h-[100vh] w-[800px] p-20 text-left">
        <SpendingView spending={transactionToSpending(getLastMonthsTransactions(transactionData, 6), 6, 100, 400) } subgoal={100} income={400} ></SpendingView>
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
    case Tabs.Transactions:
      return transactionSection;
  }
}

export default App