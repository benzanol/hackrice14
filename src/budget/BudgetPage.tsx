import * as M from "@mui/material";
import * as React from "react";
import { useContext } from "react";
import { RecurringContext } from '../App';
import { RECUR_TYPES } from "../misc/AddSource";
import { dollarsPerMonth, dollarString, partitionRecurring } from "../utils";
import BudgetBar from "./BudgetBar";


export default function BudgetPage(ps: {
  savePct: number,
}) {
  const [recurring, setRecurring] = useContext(RecurringContext);

  const partition = Object.entries(partitionRecurring(recurring));
  const incomeRs = partition.filter(([type, _]) => RECUR_TYPES[type].income);
  const income = incomeRs.flatMap(([_, rs]) => rs.map(dollarsPerMonth)).reduce((a,b) => a+b,0);

  return (
    <div className="flex flex-col items-center">
      <M.Typography variant="h3" className="pb-16 text-center">Budgeting Tool</M.Typography>
      <div className="flex">
        <BudgetBar recurring={recurring} saveGoal={ps.savePct / 100} />
      </div>
    </div>
  );
}
