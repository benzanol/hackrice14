import * as M from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import { getLastMonthsTransactions } from '../utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { RecurringContext } from "../App";
import { RECUR_TYPES, Transaction } from "../misc/AddSource";
import { dollarsPerMonth, partitionRecurring } from "../utils";

interface Props {
}

export type SpendingBarData = {
    name: string,
    spending: number,
    fill?: string
}

enum BarColor {
    OVERSPEND= "#bf212f",
    NORMAL = "#264b96",
    GOAL = "#006f3c",
}

export function transactionToSpending(filteredTransactions: Transaction[], months: number, goal: number, income: number): Array<SpendingBarData> {
    let sixMonthSpending: Array<SpendingBarData> = [];
    let currentDate: Date = new Date();
    for (var i = 0; i < months; i++) {
        sixMonthSpending.push({ name: currentDate.toLocaleString('default', { month: 'short' }), spending: 0 });
        currentDate.setMonth(currentDate.getMonth() - 1);
    }

    filteredTransactions.forEach(transaction => {
        sixMonthSpending.forEach(month => {
            if (new Date(transaction.date).toLocaleString('default', { month: 'short' }) === month.name) {
                month.spending += transaction.amount;
            }
        });
    });

    for (var i = 0; i < sixMonthSpending.length; i++) {
        if (sixMonthSpending[i].spending < goal) {
            sixMonthSpending[i].fill = BarColor.GOAL;
        }
        else if (sixMonthSpending[i].spending > income) {
            sixMonthSpending[i].fill = BarColor.OVERSPEND;
        }
        else {
            sixMonthSpending[i].fill = BarColor.NORMAL;
        }
    }
    sixMonthSpending.reverse();
    return sixMonthSpending;
}

const builtinTransactions: Transaction[] = [
  {name: "HEB", amount: 10.43, date: new Date("2024-06-20"), vendor: "HEB"},
  {name: "Velvet Tacos", amount: 11.43, date: new Date("2024-06-21"), vendor: "Velvet Tacos"},
  {name: "Ramen", amount: 20.33, date: new Date("2024-06-24"), vendor: "Maruchan"},
  {name: "Cough Drops", amount: 15.24, date: new Date("2024-09-21"), vendor: "CVS"},
  {name: "Apple Watch SE (2nd Gen)", amount: 299.56, date: new Date("2024-08-19"), vendor: "Apple"},
  {name: "JBL Xtreme 2", amount: 126.70, date: new Date("2024-09-20"), vendor: "Fuzzy's"},
  {name: "Fuzzy", amount: 7.84, date: new Date("2024-09-20"), vendor: "Fuzzy's"},
  {name: "Steam Deck", amount: 592.60, date: new Date("2024-04-20"), vendor: "Valve"},
  {name: "Ladle", amount: 10.56, date: new Date("2024-06-20"), vendor: "Valve"},
  {name: "Instax Mini 12", amount: 77.24, date: new Date("2024-04-2"), vendor: "Fujifilm"},
  {name: "Dell Curved Monitor", amount: 177.24, date: new Date("2024-07-2"), vendor: "Fujifilm"},
  {name: "WH-1000XM5", amount: 349.99, date: new Date("2024-05-30"), vendor: "Sony"},
];


const SpendingView: React.FC<Props> = () => {
  const [recurring] = React.useContext(RecurringContext);
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);
  const [showLines, setShowLines] = useState(false);

  const partition = Object.entries(partitionRecurring(recurring));
  const incomeRs = partition.filter(([type, _]) => RECUR_TYPES[type].income);
  const totalIncome = incomeRs.flatMap(([_, rs]) => rs.map(dollarsPerMonth)).reduce((a,b) => a+b, 0);
  const expenseRs = partition.filter(([type, _]) => !RECUR_TYPES[type].income);
  const expense = expenseRs.flatMap(([_, rs]) => rs.map(dollarsPerMonth)).reduce((a,b) => a+b, 0);
  const income = totalIncome - expense;

  const subgoal = income * 0.7;
  const MONTHS = 6;

  const spending = transactionToSpending(
    getLastMonthsTransactions(transactionData, MONTHS),
    MONTHS,
    subgoal,
    income,
  );

  const yval = Math.max(income, ...spending.map((spend) => spend.spending)) + 10;
  const pow = (10 ** Math.floor(Math.log10(yval)));
  const yrounded = Math.ceil(yval / pow) * pow;

  // Handler to refresh transaction data
  const onRefresh = () => {
    setTransactionData(builtinTransactions);
  };

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    setTransactionData(storedTransactions);
  }, []);

  return (
    <M.Container>
      <M.Typography variant="h4" gutterBottom>
        Spending
      </M.Typography>
      <M.Box display="flex" justifyContent="flex-end">
        <M.Button
          variant="contained"
          color="secondary"
          onClick={onRefresh}
        >
          Refresh
        </M.Button>
        <M.Button
          variant="contained"
          color="primary"
          onClick={() => setShowLines(prev => !prev)}
          style={{ marginLeft: '10px' }}
        >
          Metrics
        </M.Button>
      </M.Box>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={spending} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, yrounded]} />
          <Tooltip />
          <Bar dataKey="spending" stackId="a" fill="#8884d8" />

          {showLines && (
            <>
              <ReferenceLine y={subgoal} label="Spending Goal" stroke="orange" strokeDasharray="3 3" />
              <ReferenceLine y={income} label="Leftover Income" stroke="red" strokeDasharray="3 3" />
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    </M.Container>
  );
};

export default SpendingView;
