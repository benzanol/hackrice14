import { ExpandMore } from "@mui/icons-material";
import * as Icons from "@mui/icons-material";
import * as M from "@mui/material";
import { RecurringSource } from "../misc/AddSource";
import { dollarString } from "../utils";


export default function SummarySection(ps: {
  recurring: RecurringSource[],
  updateRecurring: () => void,
  removeRecurring: (r: RecurringSource) => void,
  expanded?: RecurringSource,
  setExpanded?: (t: RecurringSource) => void,
}) {
  return (
    <>
      {ps.recurring.map((t) => (
        <M.Accordion
          key={t.name}
          elevation={3}
          onChange={() => {
            ps.setExpanded((t == ps.expanded) ? null : t)
          }}
          sx={{marginTop: 0}}
          expanded={t == ps.expanded}
        >
          <M.AccordionSummary expandIcon={ <ExpandMore /> }>
            <div className="flex justify-between w-full">

              {/* Left aligned items */}
              <div className="flex flex-row items-center">
                <M.Typography fontWeight="bold">{t.name}</M.Typography>

                {t != ps.expanded ? null : (
                  <>
                    <div className="w-2" />
                    <M.IconButton
                      onClick={() => {
                        const newAmount = +prompt(`New amount:`)
                        if (newAmount != null && isFinite(newAmount)) {
                          t.amount = newAmount;
                          ps.updateRecurring();
                        }
                      }}>
                      <Icons.Edit />
                    </M.IconButton>
                    <M.IconButton
                      onClick={() => {
                        if (confirm(`Remove ${t.name}?`)) {
                          ps.removeRecurring(t)
                        }
                      }}>
                      <Icons.Delete />
                    </M.IconButton>
                  </>
                )}
              </div>

            {/* Right aligned items */}
            <div className="flex pr-5">
              <SummaryItemProperty value={dollarString(t.amount) + " " + t.period} />
            </div>
          </div>
        </M.AccordionSummary>

        <M.AccordionDetails className="leading-8">
          <M.Typography> Type: {t.type} </M.Typography>
          <M.Typography> Recurrence: {t.period} </M.Typography>
          <M.Typography> Amount: {dollarString(t.amount)} </M.Typography>
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
