import React, { useEffect, useState } from 'react';
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";
import Button from '@mui/material/Button';                
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';                 
import Box from '@mui/material/Box';                     

axios.defaults.baseURL = "http://localhost:8000";

// Define a style for the modal content
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function PlaidAuth({ publicToken }) {
    const [account, setAccount] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                let accessToken = await axios.post("/exchange_public_token", { public_token: publicToken });
                const auth = await axios.post("/auth", { access_token: accessToken.data.accessToken });
                setAccount(auth.data.numbers.ach[0]);
            } catch (error) {
                console.error('Error fetching account data:', error);
            }
        }
        fetchData();
    }, [publicToken]);

    return account && (
        <>
            <p>Account number: {account.account}</p>
            <p>Routing number: {account.routing}</p>
        </>
    );
}

function Linker() {
    const [linkToken, setLinkToken] = useState();
    const [publicToken, setPublicToken] = useState();
    const [openModal, setOpenModal] = useState(false);  // State to manage modal visibility

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
            setOpenModal(false); // Close modal on success
        },
    });

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenModal(true)}
            >
                Connect a bank account
            </Button>

            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
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
                </Box>
            </Modal>
        </>
    );
}

export default Linker;
