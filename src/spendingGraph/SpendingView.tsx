import * as M from "@mui/material";
import { yellow } from "@mui/material/colors";
import * as React from "react";
import { useState } from "react";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

interface Props {
    spending: Array<any>;
}

const SpendingView: React.FC<Props> = ( { spending } ) => {
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
                    <Bar dataKey="spending" fill="#8884d8" />
                    

                    // Bar with multiple colors

                    <ReferenceLine y={30} label="Goal" stroke="yellow" strokeDasharray="3 3" />
                    <ReferenceLine y={90} label="Income" stroke="red" strokeDasharray="3 3" />

                </BarChart>
            </ResponsiveContainer>
        </M.Container>
    );
};



export default SpendingView;