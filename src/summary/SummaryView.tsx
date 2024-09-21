// Things to include:
// income
// subscriptions
// bills

import * as Icons from "@mui/icons-material";
import * as M from "@mui/material";
import { capitalize } from "@mui/material";
import { useState } from "react";
import AddSource, { RecurringSource } from "../misc/AddSource";
import { partitionRecurring } from "../utils";
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

  return (
    <div>
      <AddSource callback={callback} />
      {
        Object.entries(partitionRecurring(ps.recurring)).map(([type, transactions]) => (
          <div key={type}>
            <M.Typography variant="h5" className="py-3">{capitalize(type)}</M.Typography>
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
