import * as M from "@mui/material";
import * as React from "react";
import { useContext } from "react";
import { RecurringContext } from '../App';
import { RECUR_TYPES } from "../misc/AddSource";
import { dollarsPerMonth, dollarString, partitionRecurring } from "../utils";
import BudgetBar from "./BudgetBar";


export default function BudgetPage() {
  const [recurring, setRecurring] = useContext(RecurringContext);

  const [savePct, setSavePct] = React.useState(30);

  const partition = Object.entries(partitionRecurring(recurring));
  const incomeRs = partition.filter(([type, _]) => RECUR_TYPES[type].income);
  const income = incomeRs.flatMap(([_, rs]) => rs.map(dollarsPerMonth)).reduce((a,b) => a+b,0);

  return (
    <div>
      <M.Typography variant="h3" className="pb-16 text-center">Budgeting Tool</M.Typography>
      <div className="flex">
        <BudgetBar recurring={recurring} saveGoal={savePct / 100} />
        <div className="w-16"/>
        <div>
          <M.Typography variant="body1">How much of your income do you want to save each month?</M.Typography>
          <M.Slider
            color="secondary"
            max={100}
            value={savePct}
            onChange={(_, val) => setSavePct(val as number)}
          />
          <M.Typography className="text-center" fontSize={25}>
            {Math.round(savePct)}% ({dollarString(savePct*income)})
          </M.Typography>
        </div>
      </div>
    </div>
  );
}
