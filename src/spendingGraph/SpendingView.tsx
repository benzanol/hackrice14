import * as M from "@mui/material";
import * as React from "react";
import { useState } from "react";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Transaction } from "../misc/AddSource";

interface Props {
    spending: Array<any>;
    subgoal: number;
    income: number;
}

export type SpendingBarData = {
    name: string,
    spending: number,
    fill?: string
}

enum BarColor {
    OVERSPEND= "#bf212f",
    NORMAL = "#264b96",
    GOAL = "#006f3c",
}


export function transactionToSpending(filteredTransactions: Transaction[], months: number, goal: number, income: number): Array<SpendingBarData> {
    let sixMonthSpending: Array<SpendingBarData> = [];
    let currentDate: Date = new Date();
    for (var i = 0; i < months; i++) {
        sixMonthSpending.push({ name: currentDate.toLocaleString('default', { month: 'short' }), spending: 0 });
        currentDate.setMonth(currentDate.getMonth() - 1);
    }
    filteredTransactions.forEach(transaction => {
        sixMonthSpending.forEach(month => {
            if (transaction.date.toLocaleString('default', { month: 'short' }) === month.name) {
                month.spending += transaction.amount;
            }
        });
    });

    for (var i = 0; i < sixMonthSpending.length; i++) {
        if (sixMonthSpending[i].spending < goal) {
            sixMonthSpending[i].fill = BarColor.GOAL;
        }
        else if (sixMonthSpending[i].spending > income) {
            sixMonthSpending[i].fill = BarColor.OVERSPEND;
        }
        else {
            sixMonthSpending[i].fill = BarColor.NORMAL;
        }
    }
    //Flip spending array
    sixMonthSpending.reverse();
    return sixMonthSpending;
}


const SpendingView: React.FC<Props> = ( { spending, subgoal, income } ) => {
    return (
        <M.Container>
            <M.Typography variant="h4" gutterBottom>
                Spending
            </M.Typography>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={spending} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="spending" stackId="a" fill="#8884d8" />
                    

                    <ReferenceLine y={subgoal} label="Goal" stroke="yellow" strokeDasharray="3 3" />
                    <ReferenceLine y={income} label="Income" stroke="red" strokeDasharray="3 3" />

                </BarChart>
            </ResponsiveContainer>
        </M.Container>
    );
};



export default SpendingView;