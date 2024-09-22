import * as M from "@mui/material";
import { capitalize } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from "react";
import WeekdaySelector from "./WeekSelector";


export const RECUR_PERIODS = ["daily", "weekly", "monthly", "yearly"] as const;
export type RecurPeriod = (typeof RECUR_PERIODS)[number];

export const RECUR_TYPES = {
  income: {
    singular: "Income Source",
    color: "#44bb44",
    income: true,
  },
  bills: {
    singular: "Recurring Bill",
    color: "#bb0000",
    income: false,
  },
  subscriptions: {
    singular: "Subscription",
    color: "#4466bb",
    income: false,
  },
} as const;
export type RecurType = keyof typeof RECUR_TYPES;

export type RecurringSource = {
  name: string,
  type: RecurType,
  amount: number, // Negative = expense, positive = income
  period: RecurPeriod,
  day: number, // 1 indexed day of the period (1 = monday, 1st of month, Jan 1)
};

export type Transaction = {
  name: string,
  amount: number,
  date: Date,
  vendor: string,
};

export default function AddSource(ps: {
  callback?: (s: RecurringSource | null) => void,
  initialType?: number,
}) {
  // This will clear the form on each close
  if (ps.callback == undefined) return <></>;

  const [typeIdx, setType] = useState(ps.initialType ?? 0);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("10");
  const [period, setPeriod] = useState("monthly" as RecurPeriod);
  const [day, setDay] = useState(1);

  const onClose  = () => ps.callback({
    name,
    type: Object.keys(RECUR_TYPES)[typeIdx] as RecurType,
    amount: +amount,
    period,
    day,
  });

  return (
    <M.Dialog
      open={Boolean(ps.callback)}
      onClose={() => ps.callback(null)}
      PaperProps={{
        style: { width: "700px", padding: "10px", borderRadius: "20px" }, // Set the desired width here
      }}
    >
      <M.DialogTitle className="pb-4 text-center" fontSize={35} marginTop="15px">
        Add {Object.values(RECUR_TYPES)[typeIdx].singular}
      </M.DialogTitle>

      <M.DialogContent className="flex flex-col items-center h-[70vh] rounded-2xl">
        <M.Tabs className="self-center" value={typeIdx} onChange={(_, idx) => setType(idx)}>
          {Object.keys(RECUR_TYPES).map((type) => <M.Tab label={type} />)}
        </M.Tabs>

        <div className="h-8"></div>

        <M.TextField
          autoFocus
          className="w-2/3"
          variant="outlined"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="h-6"></div>
        <M.TextField
          className="w-2/3"
          variant="outlined"
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          InputProps={{
            startAdornment: (
              <M.InputAdornment position="start">
                {Object.values(RECUR_TYPES)[typeIdx].income ? "+ $" : "– $"}
              </M.InputAdornment>
            ),
            inputMode: 'decimal', // Helps with mobile keyboards to show the numeric keypad
          }}
        />

        <div className="h-6"></div>
        <M.FormControl className="w-2/3" variant="outlined">
          <M.InputLabel id="period-label">Period</M.InputLabel>
          <M.Select
            labelId="period-label"
            value={period}
            onChange={(e) => {
              setPeriod(e.target.value as RecurPeriod);
              setDay(1);
            }}
            label="Repeat"
          >
            {RECUR_PERIODS.map((period) => (
              <M.MenuItem value={period}>{capitalize(period)}</M.MenuItem>
            ))}
          </M.Select>
        </M.FormControl>

        <div className="h-6"></div>
        {
          period == "weekly" ? (
            <>
              <M.Typography className="self-center">Select the day of the week that the payment occurs</M.Typography>
              <div className="self-center">
                <WeekdaySelector selected={day} onChange={setDay} />
              </div>
            </>
          ) : period == "monthly" ? (
            <>
              <M.Typography>Select the day of the month that the payment occurs</M.Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  onChange={(d) => setDay((d.$d as Date).getDate())} />
              </LocalizationProvider>
            </>
          ) : period == "yearly" ? (
            <>
              <M.Typography>Select the day of the year that the payment occurs</M.Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar onChange={(d) => setDay((d.$d as Date).getDate())} />
              </LocalizationProvider>
            </>
          ) : (
            <></>
          )
        }
      </M.DialogContent>

      <M.DialogActions>
        <M.Button className="self-end" variant="contained" onClick={onClose}
                  disabled={name.length == 0}>
          Submit
        </M.Button>
      </M.DialogActions>
    </M.Dialog>
  );
}
