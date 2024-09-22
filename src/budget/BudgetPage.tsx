import * as M from "@mui/material";
import { RecurringSource, RECUR_TYPES } from "../misc/AddSource";
import { dollarsPerMonth, partitionRecurring } from "../utils";


export default function BudgetPage(ps: {
  recurring: RecurringSource[],
}) {

  const partition = Object.entries(partitionRecurring(ps.recurring));
  const expenses = partition.filter(([type, _]) => !RECUR_TYPES[type].income);
  const totalExpenses = expenses.flatMap(([_, rs]) => rs.map(r => r.amount)).reduce((a,b) => a+b,0);
  const income = partition.filter(([type, _]) => RECUR_TYPES[type].income);
  const totalIncome = income.flatMap(([_, rs]) => rs.map(r => r.amount)).reduce((a,b) => a+b,0);

  const elems: [number, RecurringSource | null][] = [];
  for (let [_, transactions] of expenses) {
    for (let t of transactions) {
      const perMonth = dollarsPerMonth(t);
      if (perMonth >= 100) {
        elems.push([20, null]);
        elems.push([100, t]);
      } else {
        elems.push([perMonth, t]);
      }
    }
  }
  const totalPixelH = 600;
  const expensesDisplayH = elems.map(([n]) => n).reduce((a,b) => a+b,0);
  const incomeDisplayH = Math.max(0, expensesDisplayH + (totalIncome - totalExpenses));

  const padAboveExpenses = Math.max(0, incomeDisplayH - expensesDisplayH);
  const padAboveIncome = Math.max(0, expensesDisplayH - incomeDisplayH);

  const dollarH = totalPixelH / Math.max(incomeDisplayH, expensesDisplayH);

  return (
    <div className="relative">
      <div className="absolute left-0 w-40" style={{top: padAboveExpenses*dollarH}}>
        {elems.reverse().map(([dollars, trans]) => (
          <div className="border-black" style={{
                 borderWidth: 1,
                 borderBottomWidth: 0,
                 height: dollars*dollarH,
                 backgroundColor: !trans ? undefined : RECUR_TYPES[trans.type].color,
               }}>
            {!trans ? "..." : ""}
          </div>
        ))}
      </div>
      <div
        className="absolute left-0 w-40 border-dashed border-2 border-blue-500"
        style={{top: padAboveIncome*dollarH, height: incomeDisplayH*dollarH}}
      />
    </div>
  );
}
