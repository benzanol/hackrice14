import React, { useEffect, useState } from 'react';
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";
import Button from '@mui/material/Button';
import jsonData from '../../server/transactions.json'; // Import the JSON file

axios.defaults.baseURL = "http://localhost:8000";

function PlaidAuth({ publicToken, setTransactions }) {
    useEffect(() => {
        async function fetchData() {
            try {
                const transactions = jsonData.elements;
                localStorage.setItem('transactionData', JSON.stringify(transactions));
                setTransactions(transactions);
            } catch (error) {
                console.error('Error fetching transaction data:', error);
            }
        }
        fetchData();
    }, [publicToken, setTransactions]);

    return null;
}

function Linker({ setTransactions }) {
    const [linkToken, setLinkToken] = useState();
    const [publicToken, setPublicToken] = useState(() => localStorage.getItem('publicToken'));

    useEffect(() => {
        if (!publicToken) {
            async function fetch() {
                try {
                    const response = await axios.post("/create_link_token");
                    setLinkToken(response.data.link_token);
                } catch (error) {
                    console.error('Error creating link token:', error);
                }
            }
            fetch();
        }
    }, [publicToken]);

    const { open, ready } = usePlaidLink({
        token: linkToken,
        onSuccess: (public_token, metadata) => {
            setPublicToken(public_token);
            localStorage.setItem('publicToken', public_token);
            console.log("success", public_token, metadata);
        },
    });

    const handleLogout = () => {
        setPublicToken(null);
        localStorage.removeItem('publicToken');
        setTransactions([]); // Clear transactions on logout
    };

    return (
        <>
            {!publicToken ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => open()}
                    disabled={!ready}
                >
                    Connect a bank account
                </Button>
            ) : (
                <div>
                    <PlaidAuth publicToken={publicToken} setTransactions={setTransactions} />
                    <Button variant="contained" color="secondary" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            )}
        </>
    );
}

export default Linker;
