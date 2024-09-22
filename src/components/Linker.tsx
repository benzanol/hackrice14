import React, { useEffect, useState } from 'react';
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";
import Button from '@mui/material/Button';

axios.defaults.baseURL = "http://localhost:8000";

function PlaidAuth({ publicToken }) {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                let accessToken = await axios.post("/exchange_public_token", { public_token: publicToken });
                const auth = await axios.post("/auth", { access_token: accessToken.data.accessToken });
                const availableBalance = auth.data.accounts.find(account => account.balances.available !== null)?.balances.available;
                setBalance(availableBalance);
            } catch (error) {
                console.error('Error fetching account data:', error);
            }
        }
        fetchData();
    }, [publicToken]);

    return balance !== null && (
        <p>Available balance: ${balance.toFixed(2)}</p>
    );
}

function Linker() {
    const [linkToken, setLinkToken] = useState();
    const [publicToken, setPublicToken] = useState();

    useEffect(() => {
        async function fetch() {
            try {
                const response = await axios.post("/create_link_token");
                setLinkToken(response.data.link_token);
            } catch (error) {
                console.error('Error creating link token:', error);
            }
        }
        fetch();
    }, []);

    const { open, ready } = usePlaidLink({
        token: linkToken,
        onSuccess: (public_token, metadata) => {
            setPublicToken(public_token);
            console.log("success", public_token, metadata);
        },
    });

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
                <PlaidAuth publicToken={publicToken} />
            )}
        </>
    );
}

export default Linker;

