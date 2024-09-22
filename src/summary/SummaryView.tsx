// Things to include:
// income
// subscriptions
// bills

import * as Icons from "@mui/icons-material";
import * as M from "@mui/material";
import { capitalize } from "@mui/material";
import { useContext, useState } from "react";
import AddSource, { RecurringSource, RECUR_TYPES } from "../misc/AddSource";
import { dollarsPerMonth, dollarString, partitionRecurring } from "../utils";
import SummarySection from "./SummarySection";
import { RecurringContext } from '../App';


export default function SummaryView({ savePct, setSavePct }: {
  savePct: number,
  setSavePct: (n: number) => void,
}) {
  const [recurring, setRecurring] = useContext(RecurringContext);
  const [expanded, setExpanded] = useState(null as RecurringSource | null);

  const [displaySubs, setDisplaySubs] = useState(false);

  const [callback, setCallback] = useState<null | ((r: RecurringSource) => void)>(null);
  const cb = (r: RecurringSource | null) => {
    setCallback(null);
    if (r != null) {
      setRecurring([...recurring, r]);
    }
  };

  const partition = Object.entries(partitionRecurring(recurring));
  const incomeRs = partition.filter(([type, _]) => RECUR_TYPES[type].income);
  const income = incomeRs.flatMap(([_, rs]) => rs.map(dollarsPerMonth)).reduce((a,b) => a+b,0);

  return (
    <div>
      <AddSource callback={callback} />
      {
        Object.entries(partitionRecurring(recurring)).map(([type, transactions]) => (
          <div key={type}>

            <div className="flex flex-row items-center justify-between">
              <M.Typography variant="h5" className="pb-4 pt-6">{capitalize(type)}</M.Typography>

              <div className="flex">
                <M.Typography fontSize={18}>{RECUR_TYPES[type].income ? "+" : "–"}</M.Typography>
                <M.Typography fontSize={18}>
                  {dollarString(
                    ((type == "subscriptions" && !displaySubs) ? [] : transactions)
                      .map(dollarsPerMonth).reduce((a,b) => a+b, 0)
                  )}
                </M.Typography>
                <div className="w-1" />
                <M.Typography fontSize={18}>monthly</M.Typography>
              </div>
            </div>

            <SummarySection recurring={(type == "subscriptions" && !displaySubs) ? [] : transactions}
                            updateRecurring={() => setRecurring([...recurring])}
                            removeRecurring={r => setRecurring(recurring.filter(e => r != e))}
                            expanded={expanded}
                            setExpanded={setExpanded}
            />
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

      <M.Button variant="outlined" className="m-10 mx-auto" onClick={() => setDisplaySubs(true)}>Parse Subscriptions</M.Button>

      <div className="pt-16 px-20">
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
  );
}
