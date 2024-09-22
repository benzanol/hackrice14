// Things to include:
// income
// subscriptions
// bills

import * as Icons from "@mui/icons-material";
import * as M from "@mui/material";
import { capitalize } from "@mui/material";
import { useState } from "react";
import AddSource, { RecurringSource, RECUR_TYPES } from "../misc/AddSource";
import { dollarsPerMonth, dollarString, partitionRecurring } from "../utils";
import SummarySection from "./SummarySection";


export default function SummaryView(ps: {
  recurring: RecurringSource[],
  setRecurring: (r: RecurringSource[]) => void,
}) {
  const [expanded, setExpanded] = useState(null as RecurringSource | null);

  const [callback, setCallback] = useState<null | ((r: RecurringSource) => void)>(null);
  const cb = (r: RecurringSource | null) => {
    setCallback(null);
    if (r != null) {
      ps.setRecurring([...ps.recurring, r]);
    }
  };

  return (
    <div>
      <AddSource callback={callback} />
      {
        Object.entries(partitionRecurring(ps.recurring)).map(([type, transactions]) => (
          <div key={type}>

            <div className="flex flex-row items-center justify-between">
              <M.Typography variant="h5" className="pb-4 pt-6">{capitalize(type)}</M.Typography>

              <div className="flex">
                <M.Typography fontSize={18}>{RECUR_TYPES[type].income ? "+" : "–"}</M.Typography>
                <M.Typography fontSize={18}>
                  {dollarString(transactions.map(dollarsPerMonth).reduce((a,b) => a+b, 0))}
                </M.Typography>
                <div className="w-1" />
                <M.Typography fontSize={18}>monthly</M.Typography>
              </div>
            </div>

            <SummarySection recurring={transactions}
                            updateRecurring={() => ps.setRecurring([...ps.recurring])}
                            removeRecurring={r => ps.setRecurring(ps.recurring.filter(e => r != e))}
                            expanded={expanded}
                            setExpanded={setExpanded} />
          </div>
        ))
      }
      <div className="h-10"></div>

      <M.Button
        sx={{
          position: "absolute",
          bottom: 40, right: 40,
          width: 70, height: 70,
          borderRadius: 100,
        }}
        variant="contained"
        onClick={() => setCallback(() => cb)}
      >
        <Icons.Add sx={{ fontSize: 40 }} />
      </M.Button>
    </div>
  );
}
