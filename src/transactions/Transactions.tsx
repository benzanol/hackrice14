import * as React from "react";
import * as M from "@mui/material";
import { ListItem, ListItemText } from "@mui/material";
import { List } from "@mui/material";
import Linker from "../components/Linker"; 

const Transactions = () => {
    const [transactionState, setTransactions] = React.useState([]);

    return (
        <M.Container>
            <M.Typography variant="h4" gutterBottom>
                Transactions
            </M.Typography>

            <Linker setTransactions={setTransactions} />

            <div>
                <M.Box display="flex" justifyContent="flex-end" mb={2}></M.Box>
                <M.FormControl variant="outlined" size="small">
                    <M.InputLabel>Sort By</M.InputLabel>
                    
                    <M.Select
                        label="Sort By"
                        defaultValue="dateRTO"
                        onChange={(e) => {
                            const value = e.target.value;
                            switch (value) {
                                case "dateRTO":
                                    setTransactions([...transactionState.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())]);
                                    break;
                                case "dateOTR":
                                    setTransactions([...transactionState.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())]);
                                    break;
                                case "amountLTH":
                                    setTransactions([...transactionState.sort((a, b) => a.amount - b.amount)]);
                                    break;
                                case "amountHTL":
                                    setTransactions([...transactionState.sort((a, b) => b.amount - a.amount)]);
                                    break;
                            }
                        }}
                    >
                        <M.MenuItem value="dateRTO">Date Recent</M.MenuItem>
                        <M.MenuItem value="dateOTR">Date Oldest</M.MenuItem>
                        <M.MenuItem value="amountLTH">Amount: Low to High</M.MenuItem>
                        <M.MenuItem value="amountHTL">Amount: High to Low</M.MenuItem>
                    </M.Select>
                </M.FormControl>
            </div>
            <List component="div">
                {transactionState.map(transaction => (
                    <M.Card variant="outlined" sx={{ marginBottom: 2 }} key={transaction.transaction_id}>
                        <ListItem>
                            <ListItemText
                                primary={transaction.name || "No name"}
                                secondary={`${new Date(transaction.date).toDateString()}`} 
                            />
                            <ListItemText
                                primary={""}
                                secondary={`$${transaction.amount.toFixed(2)}`}
                                style={{ textAlign: 'right' }} 
                            />
                        </ListItem>
                    </M.Card>
                ))}
            </List>
        </M.Container>
    );
};

export default Transactions;

