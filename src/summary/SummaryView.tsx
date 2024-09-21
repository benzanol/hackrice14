// Things to include:
// income
// subscriptions
// bills

import * as React from "react";
import { useState } from "react";
import { RecurringSource } from "../misc/AddSource";
import SummarySection from "./SummarySection";

const subs: RecurringSource[] = [
  {name: "Netflix", period: "monthly", day: 1, amount: 10},
  {name: "Spotify", period: "monthly", day: 1, amount: 4},
  {name: "NFL+", period: "monthly", day: 1, amount: 7},
];
const bills: RecurringSource[] = [
  {name: "Rent", period: "monthly", day: 1, amount: 200},
  {name: "Electricity", period: "monthly", day: 1, amount: 100},
];


export default function SummaryView(ps: {}) {
  const [expanded, setExpanded] = useState(null as RecurringSource | null);

  return (
    <>
      <SummarySection title="Subscriptions" transactions={subs}
                      expanded={expanded} setExpanded={setExpanded} />
      <SummarySection title="Bills" transactions={bills}
                      expanded={expanded} setExpanded={setExpanded} />
    </>
  );
}
