import { ExpandMore } from "@mui/icons-material";
import * as M from "@mui/material";
import { useContext, useState } from "react";
import { RecurringContext } from "../App";
import AddSource, { RecurringSource } from "../misc/AddSource";


function weeklyPrice(t: RecurringSource): string {
  const weekly = t.amount;
  return weekly.toFixed(2);
}

export default function SummarySection(ps: {
  title: string,
  transactions: RecurringSource[],
  expanded?: RecurringSource,
  setExpanded?: (t: RecurringSource) => void,
}) {
  return (
    <>
      <M.Typography variant="h5" className="py-3">{ps.title}</M.Typography>
      {ps.transactions.map((t) => (
        <M.Accordion
          key={t.name}
          elevation={3}
          onChange={() => {
            ps.setExpanded((t == ps.expanded) ? null : t)
          }}
          expanded={t == ps.expanded}
        >
          <M.AccordionSummary expandIcon={ <ExpandMore /> }>
            <div className="flex justify-between w-full">
              <M.Typography>{t.name}</M.Typography>

              <div className="flex pr-5">
                <SummaryItemProperty value={"$" + t.amount.toFixed(2) + " " + t.period} />
              </div>
            </div>
          </M.AccordionSummary>

          <M.AccordionDetails className="leading-8">
            <M.Typography> Type: {t.type} </M.Typography>
            <M.Typography> Recurrence: {t.period} </M.Typography>
            <M.Typography> Amount: ${t.amount} </M.Typography>
            {
              t.period == "weekly" ? (
                <M.Typography>
                  Day of Payments:
                  {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][t.day]}
                </M.Typography>
              ) : t.period == "monthly" ? (
                <M.Typography>Day of Month: {t.day}</M.Typography>
              ) : <></>
            }
          </M.AccordionDetails>
        </M.Accordion>
      ))}
    </>
  );
};

function SummaryItemProperty(ps: {value: string}) {
  return (
    <M.Typography>
      {ps.value}
    </M.Typography>
  );
}
