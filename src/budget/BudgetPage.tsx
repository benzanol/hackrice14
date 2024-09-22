import * as M from "@mui/material";
import { RecurringSource, RECUR_TYPES } from "../misc/AddSource";
import { dollarsPerMonth, dollarString, partitionRecurring, stripeGradient } from "../utils";
import * as React from "react";
import Hoverable from "../misc/Hoverable";
import BudgetPopup from "./BudgetPopup";


export default function BudgetPage(ps: {
  recurring: RecurringSource[],
}) {

  const partition = Object.entries(partitionRecurring(ps.recurring));
  const expenses = partition.filter(([type, _]) => !RECUR_TYPES[type].income);
  const totalExpenses = expenses.flatMap(([_, rs]) => rs.map(dollarsPerMonth)).reduce((a,b) => a+b,0);
  const income = partition.filter(([type, _]) => RECUR_TYPES[type].income);
  const totalIncome = income.flatMap(([_, rs]) => rs.map(dollarsPerMonth)).reduce((a,b) => a+b,0);
  const totalBills = partition.find(([t]) => t == "bills")[1].map(dollarsPerMonth).reduce((a,b) => a+b,0)
  const totalSubs = partition.find(([t]) => t == "subscriptions")[1].map(dollarsPerMonth).reduce((a,b) => a+b,0)

  const elems: [number, RecurringSource, string][][] = [];
  let billsDisplayH = 0;
  let expensesDisplayH = 0;
  let subsDisplayH = 0;

  for (let [_, transactions] of expenses) {
    for (let t of transactions) {
      const perMonth = dollarsPerMonth(t);
      let displayH: number;
      if (perMonth >= 1000000) {
        elems.push([[10, t, "before"], [100, t, "between"], [10, t, "after"]]);
        displayH = 120;
      } else {
        elems.push([[perMonth, t, "normal"]]);
        displayH = perMonth;
      }
      expensesDisplayH += displayH;
      if (t.type == "bills") {
        billsDisplayH += displayH;
      } else if (t.type == "subscriptions") {
        subsDisplayH += displayH;
      }
    }
  }
  const pixelW = 160;
  const leftPad = 200;
  const totalPixelH = 600;
  const incomeDisplayH = Math.max(0, expensesDisplayH + (totalIncome - totalExpenses));

  const padAboveExpenses = Math.max(0, incomeDisplayH - expensesDisplayH);
  const padAboveIncome = Math.max(0, expensesDisplayH - incomeDisplayH);
  const padAboveGoal = padAboveIncome + 0.3 * totalIncome;

  const dollarH = totalPixelH / Math.max(incomeDisplayH, expensesDisplayH);

  return (
    <div>
      <M.Typography variant="h3" className="pb-16 text-center">Budgeting Tool</M.Typography>
      <div className="relative">
        <div className="absolute" style={{left: leftPad, width: pixelW, top: padAboveExpenses*dollarH}}>
          {elems.reverse().map((hoverable) => (
            <Hoverable popup={() => <BudgetPopup recurring={hoverable[0][1]} />}>
              {hoverable.map(([dollars, trans, role]) => (
                <div className="border-black flex flex-col justify-center text-center" style={{
                       borderTopWidth: role == "before" ? 1 : role == "normal" ? 1 : 0,
                       height: dollars*dollarH,
                       background: (role != "before" && role != "after") ? RECUR_TYPES[trans.type].color
                       //: undefined,
                         : stripeGradient(RECUR_TYPES[trans.type].color),
                     }}
                >
                  {
                    !(role == "between" || dollars >= 50) ? <></> : (
                      <M.Typography color="white" fontWeight="bold">
                        {trans.name}: {dollarString(trans.amount)}
                      </M.Typography>
                    )
                  }
                </div>
              ))}
            </Hoverable>
          ))}
        </div>

        {/* Dashed bars for total income and goal income */}
        <div
          className="absolute border-dashed border-2 border-blue-500"
          style={{
            pointerEvents: "none",
            left: leftPad, width: pixelW,
            top: padAboveIncome*dollarH, height: incomeDisplayH*dollarH,
          }}
        />
        <div
          className="absolute left-0 h=0 w-40 border-dashed border-t-2 border-purple-500"
          style={{
            pointerEvents: "none",
            left: leftPad, width: pixelW,
            top: padAboveGoal*dollarH,
          }}
        />

        {/* Bracket for income */}
        <Bracket x={leftPad}
                 y={0}
                 height={incomeDisplayH*dollarH}
                 left={true}
                 label={`Income: ${dollarString(totalIncome)}`}
                 labelTop
                 color="#4466bb"
        />
        <Bracket x={leftPad}
                 y={padAboveGoal*dollarH}
                 height={totalPixelH - (padAboveGoal*dollarH)}
                 left={true}
                 label={`Spending Target: ${dollarString(totalIncome*0.7)}`}
                 labelTop
                 color="#9933cc"
        />

        {/* Bracket for bills */}
        <Bracket x={leftPad}
                 y={totalPixelH - billsDisplayH*dollarH}
                 height={billsDisplayH*dollarH}
                 left={true}
                 label={`Bills: ${dollarString(totalBills)}`}
        />
        {/* Bracket for subscriptions */}
        <Bracket x={leftPad}
                 y={totalPixelH - (billsDisplayH+subsDisplayH)*dollarH}
                 height={subsDisplayH*dollarH}
                 left={true}
                 label={`Subscriptions: ${dollarString(totalSubs)}`}
        />

      </div>
    </div>
);
}


function Bracket(ps: {
  x: number,
  y: number,
  height: number,
  left: boolean,
  label: string,
  labelTop?: boolean,
  color?: string,
}) {
  const bracketWidth = 36;
  const bracketXMargin = 8;
  const bracketYMargin = 1;

  const textboxWidth = 1000;
  const borderW = "2px";
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: ps.left ? ps.x - bracketWidth : ps.x,
          top: ps.y,
          width: bracketWidth - 2*bracketXMargin,
          height: ps.height - 2*bracketYMargin,
          margin: `${bracketYMargin}px ${bracketXMargin}px`,
          borderColor: ps.color ?? "#445566",
          borderWidth: borderW,
          borderLeftWidth: ps.left ? borderW : 0,
          borderRightWidth: ps.left ? 0 : borderW,
        }} />
      <div
        style={{
          position: "absolute",
          left: ps.left ? (ps.x - bracketWidth - textboxWidth) : (ps.x + bracketWidth),
          top: ps.y,
          width: textboxWidth,
          height: ps.labelTop ? 10 : ps.height,
          padding: "0 2px",
          textAlign: ps.left ? "right" : "left",
        }}
        className="flex flex-col justify-center"
      >
        <M.Typography color={ps.color}>{ps.label}</M.Typography>
      </div>
    </>
  );
}
