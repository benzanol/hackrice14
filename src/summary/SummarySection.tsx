import { ExpandMore } from "@mui/icons-material";
import * as M from "@mui/material";
import { RecurringSource } from "../misc/AddSource";


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
          elevation={3}
          onChange={() => {
            console.log('blah', ((t == ps.expanded) ? null : t))
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

          <M.AccordionDetails>
            More info
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
