import * as M from "@mui/material";
import { useState } from "react";


export default function SetupPage(ps: {}) {
  const [savePct, setSavePct] = useState(30);
  return (
    <>
      <M.Typography variant="h3" className="pb-8">Set your preferences</M.Typography>

      <M.Typography variant="body1">What is your expected income per week?</M.Typography>
      <div className="h-4"></div>
      <M.TextField
        variant="outlined" label="Income"
        className="outline-solid"
      />

      <div className="h-10"></div>

      <M.Typography variant="body1">How much of your income do you want to save?</M.Typography>
      <div className="h-4"></div>
      <div className="w-1/2">
        <M.Typography className="text-center">
          {Math.round(savePct)}% - ${(savePct*1000).toFixed(2)}
        </M.Typography>
        <M.Slider
          max={100}
          value={savePct}
          onChange={(_, val) => setSavePct(val as number)}
        />
      </div>
    </>
  );
}
