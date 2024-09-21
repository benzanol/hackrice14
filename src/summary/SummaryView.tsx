// Things to include:
// income
// subscriptions
// bills

import * as M from "@mui/material";
import * as React from "react";
import { useState } from "react";
import AddSource, { RecurringSource, RECUR_TYPES } from "../misc/AddSource";
import { capitalizeFirst } from "../utils";
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
      console.log('Setting', [...ps.recurring, r])
      ps.setRecurring([...ps.recurring, r]);
    }
  };

  const partition = RECUR_TYPES.map((type) => (
    <SummarySection title={capitalizeFirst(type)}
                    transactions={ps.recurring.filter((r) => r.type == type)}
                    expanded={expanded}
                    setExpanded={setExpanded} />
  ));

  return (
    <div className="flex flex-col items-stretch">
      <AddSource callback={callback} />
      {partition}
      <div className="h-10"></div>
      <M.Button className="self-center" variant="contained" onClick={() => setCallback(() => cb)}>Add +</M.Button>
    </div>
  );
}
