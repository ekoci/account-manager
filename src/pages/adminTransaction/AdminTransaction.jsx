import React, {useState, useEffect} from "react";
import './AdminTransaction.css'
import {Row,Col} from "react-bootstrap";
import {Icon} from 'semantic-ui-react'
import TransactionDetails from "../../components/transactionDetails/TransactionDetails";
import EditTransaction from "../../components/editTransaction/EditTransaction";

import {
    Link
} from "react-router-dom";
import apiGtw from "../../api";
import {CircularProgress, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
async function fetchTransactData(id) {
    console.log('fetchTransactData', id)
    const result = await apiGtw.get(
        'spotify/transaction/getById?id='+id,
    );
    return result.data;
}
const AdminTransaction = (props)=>{

    const [adminTransactionData, setData] = useState({});
    const [orderDataDetails, setOrder] = useState({})
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await fetchTransactData(props.match.params.id);
            console.log(data)
            setData(data);
            const {amount, createdAt, description , id,  paymentMethod ,  transactionStatus, user} = data;
            const orderDetails = {
                amount: amount,
                createdAt: createdAt,
                description: description,
                paymentMethod: paymentMethod,
                transactionId: transactionStatus.id,
                transactionStatus: transactionStatus.description,
                userName: user.username,
                eMail: user.email
            }
            console.log('orderDetails',orderDetails)
            setOrder(orderDetails);
            setSuccess(true);
            // switch loading to false after fetch is complete
        } catch (error) {
            // add error handling here
            console.log(error);
            setError(true);
        }
        setLoading(false);
    }, []);


    const handleClose = () => {
        setSuccess(false);
        setError(false);
    };

    // console.log('enxhi', transactionDetails)
    return(
        <>

            <div className="admin-transaction">
                <Row className="page-back-transaction">
                    <Link to={`/adminTransactions`}>
                    <Icon name='angle left' />
                    <span>Transaction </span>
                    </Link>
                </Row>
                <Row>
                    <span className="transaction-name">Transaction {props.match.params.id}</span>
                </Row>
                <Row>
                    {loading ?
                        (
                            <div style={{
                                'width': '100%',
                                'alignItems': 'center',
                                'display': 'flex',
                                'justify-content': 'center'
                            }}>
                                <CircularProgress
                                    color="#00BC87"
                                    style={{ color: "#00BC87!important" }}
                                />
                            </div>
                        )
                        :
                        success ?
                        <>
                    <Col className="transaction-label-column" md={8}>
                        <span className="transaction-label">Transaction Details</span>
                        <TransactionDetails orderData={orderDataDetails}></TransactionDetails>
                    </Col>
                    <Col className="transaction-label-column" md={4}>
                        <span className="transaction-label">Edit Transaction</span>
                        <EditTransaction adminTransaction={adminTransactionData}/>
                    </Col>
                    </>
                            :null
                    }
                </Row>
            </div>
            <Snackbar open={error} autoHideDuration={4000} onClose={handleClose}>
                {error && (
                    <Alert onClose={handleClose} severity="error">
                        Error! Couldn't process request!
                    </Alert>
                )}
            </Snackbar>
        </>

    );
}

export default AdminTransaction;