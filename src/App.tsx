import * as React from 'react';
import { useState } from 'react';
import './App.css';

import { RecurringSource, Transaction } from './misc/AddSource';
import { SpendingBarData } from './spendingGraph/SpendingView';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Sidebar from './Sidebar';
import Linker from './components/Linker'

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


function App() {
    return (
        <div>
            <Navbar />
            <Hero />
        </div>
    );
}

export default App
