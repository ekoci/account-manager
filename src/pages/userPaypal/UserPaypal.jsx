import React, { useState, useEffect,useReducer } from 'react';
import {Row, Col} from "react-bootstrap";
import Checkbox from '@material-ui/core/Checkbox';
import './UserPaypal.css';
import withStyles from "@material-ui/core/styles/withStyles";
import apiGtw from "../../api";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
async function fetchTransactData() {
    const result = await apiGtw.get(
        '/spotify/paymentMethod/getById?pmId=1',
    );
    return result.data;
}
async function fetchUserData(id) {
    const result = await apiGtw.get(
        'spotify/user/getById?userId='+id,
    );
    return result.data;
}
const GreenCheckbox = withStyles({
    root: {
        color: '#00BC87',
        '&$checked': {
            color: '#00BC87',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);
const UserPaypal = (props)=>{
    const [checked, setChecked] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [paypalData, setData] = useState({ hits: [] });
    const [user, setUserData] = useState({ hits: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await fetchTransactData();
            setData(data);
            const userData = await fetchUserData(localStorage.getItem('token'));
            setUserData(userData);
            // switch loading to false after fetch is complete
        } catch (error) {
            // add error handling here
            console.log(error);
        }
        setLoading(false);
    }, []);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const addFoundsFunction = async (e) => {
        e.preventDefault();
        const fundsData = {
            "amount": props.match.params.amount,
            "description": null,
            "transactionId": transactionId,
            "paymentMethod": paypalData,
            "transactionStatus": {
                id: 1,
                description: 'confirmed'
            },
            "user":user
        }
        try {
            setLoading(true);
            const data = await apiGtw.post(
                'spotify/transaction/addFunds',fundsData
            );
            setSuccess(true);
        } catch (error) {
            // add error handling here
            console.log(error);
            setError(false);
        }
        setLoading(false);
    };

    const handleClose = () => {
        setSuccess(false);
        setError(false);
    };
    return(
        <>
            <div className="admin-transaction">
                <Row style={{marginLeft:'-30px'}}>
                    <span className="admin-transaction-tittle">
                        Add Funds
                    </span>
                </Row>
                <Row>
                    <Col className="transaction-label-column" md={8}>
                        <Row className="request-found">
                            <span className="transaction-label">Send PayPal Payment</span>
                            <form style={{width:"100%"}} >
                                <div className="order-detail">
                                    <div style={{position:"relative"}}>
                                        <span className="input-label">
                                            PayPal Address
                                        </span>
                                        <input className="input-form" value={paypalData.details} placeholder="PayPal Transaction ID" readOnly
                                        />
                                        <span className="copy-label" onClick={() => {navigator.clipboard.writeText(props.match.params.email)}}>COPY</span>
                                    </div>
                                    <div style={{marginTop:"30px", position:"relative"}}>
                                        <span className="input-label">
                                            Amount
                                        </span>
                                        <input className="input-form"  value={props.match.params.amount} placeholder="PayPal Transaction ID" readOnly
                                        />
                                        <span className="copy-label" onClick={() => {navigator.clipboard.writeText(props.match.params.amount)}}>COPY</span>
                                    </div>
                                </div>
                            </form>
                        </Row>
                        <Row className="request-found mt-5" >
                            <div>

                                <span className="transaction-label">Request Funds</span>
                            </div>
                            <div>
                                <form style={{width:"100%"}}
                                      onSubmit={(e)=>addFoundsFunction(e)} >

                                    <div className="order-detail">
                                        <div>
                                        <span className="input-label">
                                            PayPal Transaction ID
                                        </span>
                                            <input className="input-form" value={transactionId}
                                                   onChange={(e) => setTransactionId(e.target.value)}
                                                   placeholder="PayPal Transaction ID" required
                                            />
                                        </div>
                                        <div style={{marginTop:"15px", marginLeft:"-10px"}}>
                                            <GreenCheckbox
                                                checked={checked}
                                                onChange={handleChange}
                                            />
                                            <span className="checkbox-label">
                                                I agree that the funds might get lost if I don't follow all the instructions mentioned in the right section.
                                            </span>
                                        </div>
                                        <div className="input-container">
                                            <Col style={{padding: '0px'}}>
                                                <button type="submit" className="edit-button" disabled={!checked}
                                                        style={{padding: '13px 27px'}}
                                                >REQUEST FUNDS</button>
                                            </Col>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </Row>
                    </Col>
                    <Col className="transaction-label-column" md={4}>
                            <span className="transaction-label">Instructions</span>
                            <div className="user-dashboard-footer">
                                <span className="staff-members-header">Instructions</span>
                                <span className="staff-members">
                                    Send the payment as Friends & Family to our PayPal address and fill the PayPal Transaction ID to request the funds.
                                </span>
                                <span className="staff-members">
                                    After requesting the funds it might take up to 24 hours for the funds to be added to your account.
                                </span>

                                <span className="staff-members">
                                   Please make sure the payment is sent as Friends & Family or your funds will be lost and you might risk getting banned.
                                </span>

                                <span className="staff-members">
                                    Sending more/less funds than what is required might slow the deposit up to 48 hours.
                                              </span>
                                <span className="staff-members">
                                    If 48 hours have passed from the moment you requested the funds and the funds are still unavailable than please contact our support team.
                                              </span>
                            </div>
                        </Col>

                </Row>

            </div>
            <Snackbar open={error} autoHideDuration={4000} onClose={handleClose}>
                {error && (
                    <Alert onClose={handleClose} severity="error">
                        Error! Couldn't process request!
                    </Alert>
                )}
            </Snackbar>
            <Snackbar open={success} autoHideDuration={4000} onClose={handleClose}>
                {success && (
                    <Alert onClose={handleClose} severity="success">
                        You have made request successfully!
                    </Alert>
                )}
            </Snackbar>
        </>

    );
}

export default UserPaypal
