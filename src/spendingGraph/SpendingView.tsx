import * as M from "@mui/material";
import * as React from "react";
import { useState } from "react";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', spending: 65 },
    { name: 'Feb', spending: 59 },
    { name: 'Mar', spending: 80 },
    { name: 'Apr', spending: 81 },
    { name: 'May', spending: 56 },
    { name: 'Jun', spending: 55 },
    { name: 'Jul', spending: 40 },
    { name: 'Aug', spending: 48 },
    { name: 'Sep', spending: 38 },
    { name: 'Oct', spending: 39 },
    { name: 'Nov', spending: 48 },
    { name: 'Dec', spending: 38 },
];




const SpendingView: React.FC = () => {
    return (
        <M.Container>
            <M.Typography variant="h4" gutterBottom>
                Spending
            </M.Typography>


            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    
                    <Bar dataKey="spending" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </M.Container>
    );
};



export default SpendingView;