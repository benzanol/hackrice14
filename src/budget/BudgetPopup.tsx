import * as M from "@mui/material";
import { RecurringSource } from "../misc/AddSource";
import { dollarsPerMonth, dollarString } from "../utils";


export default function BudgetPopup(ps: {recurring: RecurringSource}) {
  const r = ps.recurring;
  return (
    <div className="flex flex-col items-center min-w-48 p-2">
      <M.Typography variant="h5" className="self-center pb-2">{r.name}</M.Typography>
      <M.Typography>{dollarString(dollarsPerMonth(r))} per month</M.Typography>
      <M.Typography>Paid {r.period}</M.Typography>
    </div>
  );
}
