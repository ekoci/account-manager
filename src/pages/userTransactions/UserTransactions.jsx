import React, {useState, useEffect, useReducer} from 'react';
import {Container, Row, Button, Nav, Col} from "react-bootstrap";
import apiGtw from '../../api';
import Table from "../../components/table/Table";
import {formatDate} from "../../Helpers"
import {Select} from "semantic-ui-react";
import {useHistory} from 'react-router-dom';
import {Alert} from "@material-ui/lab";
import {CircularProgress, Snackbar} from "@material-ui/core";
import {forEach} from "react-bootstrap/ElementChildren";

async function fetchTransactData(id) {
    const result = await apiGtw.get(
        '/spotify/transaction/usersTransactions?uuid='+id,
    );
    return result.data;
}
async function fetchUserData(id) {
    const result = await apiGtw.get(
        'spotify/user/getById?userId='+id,
    );
    return result.data;
}
async function fetchPaymentData() {
    const result = await apiGtw.get(
        '/spotify/paymentMethod/getById?pmId=2',
    );
    return result.data;
}
const UserTransactions = () => {

    const [transactData, setData] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState({hits: []});
    const [paymentData, setPaymentData] = useState(null);
    const [user, setUserData] = useState({ hits: [] });
    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'paymentMethod', headerName: 'Payment Method', width: 170},
        {field: 'amount', headerName: 'Amount', width: 100},
        {field: 'transactionStatus', headerName: 'Status', width: 170},
        {field: 'createdAt', headerName: 'Creation Date', width: 170, valueFormatter: ({value}) => formatDate(value),},
    ];

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successFund, setSuccessFund] = useState(false);
    const [balance, setbalance] = useState(false);

    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);

            const userData = await fetchUserData(localStorage.getItem('token'));
            setUserData(userData);
            const data = await fetchTransactData(localStorage.getItem('token'));
            console.log(data)
            if(data.length===1 && data[0].transactionId ===null){
                setData([]);
            }else{
                setData(data);
            }
            const userPaymentMethod = data[0].usersPaymentMethods;
            let payment = []
           for (let i=0; i< userPaymentMethod.length ; i++){
               if(userPaymentMethod[i].status === "active"){
                   let pay = {
                       key: userPaymentMethod[i].description,
                       value: userPaymentMethod[i].description,
                       text: userPaymentMethod[i].description
                   }
                   payment.push(pay)
               }

           }
            setPaymentMethods(payment);
            setbalance(data[0].user.balance);
            const paymentDataResponse = await fetchPaymentData();
            setPaymentData(paymentDataResponse);
            // switch loading to false after fetch is complete
            setSuccess(true);
        } catch (error) {
            // add error handling here
            setError(true);
            console.log(error);
        }
        setLoading(false);
    }, []);

    const handleClose = () => {
        setSuccessFund(false);
        setError(false);
    };
    const [payment, setPaymentMethod] = useState();
    const [funds, setFunds] = useState(0);
    const history = useHistory();
    const addFoundsFunction = async (e, paymentMethod, funds) => {
        e.preventDefault();
        console.log(payment)
        console.log('addFoundsFunction',paymentMethod, funds, paymentData);
        const fundsData = {
            "amount": funds,
            "description": null,
            "transactionId": null,
            "paymentMethod": paymentData,
            "transactionStatus": {
                id: 1,
                description: 'confirmed'
            },
            "user":user
        }
        try {
            const data = await apiGtw.post(
                'spotify/transaction/addFunds',fundsData
            );
            console.log(data);
            setSuccessFund(true);
            // console.log(data)
        } catch (error) {
            // add error handling here
            console.log(error);
            setError(true);
        }
    };

    const paymentCases = (event)=>{
        switch (payment){
            case 'paypal':
                history.push('/userTransactions/userPaypal' + funds)
                return;
            case 'coinbase':
                addFoundsFunction(event, payment, funds)
                return ;
            case 'manual':
                history.push('/userTransactions/userManualPayments')
                return;
            default:
                return;
        }
    }
    return (
        <>
            <div className="admin-transaction">
                <Row style={{marginLeft: '-30px'}}>
                    <span className="admin-transaction-tittle">
                        Transactions
                    </span>
                </Row>
                <Row>
                    {loading ?
                        (
                            <div style={{
                                    'width': '100%',
                                    'alignItems': 'center',
                                    'display': 'flex',
                                    'justifyContent': 'center'
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
                                <Row>
                                    <span className="transaction-label">Add Funds</span>
                                    <form style={{
                                        width: '100%',
                                        marginBottom: '68px',
                                        marginRight: '30px'
                                    }}
                                          onSubmit={(event) => paymentCases(event)}>
                                        <div className="order-detail">
                                            <div>
                                                <span className="input-label">
                                                    Payment Method
                                                </span>
                                                {/*<input className="input-form"/>*/}
                                                <Select placeholder='Select status'
                                                        className="input-form status-dropdown"
                                                        options={paymentMethods} required={true}
                                                        onChange={(e, {value}) => setPaymentMethod(value)}/>
                                            </div>
                                            <div className="input-container">
                                                <span className="input-label">
                                                        Funds
                                                    </span>
                                                <input className="input-form" type="number" value={funds}
                                                       required={true}
                                                       onChange={(e) => setFunds(e.target.value)}
                                                />
                                            </div>
                                            <div className="input-container">
                                                <Col style={{padding: '0px'}}>
                                                    <button type="submit" className="edit-button"
                                                            style={{padding: '13px 27px'}}
                                                    >
                                                        ADD FUNDS
                                                    </button>
                                                </Col>
                                            </div>
                                        </div>
                                    </form>
                                </Row>
                                <Row>
                                    <span className="transaction-label"  style={{marginBottom:"30px"}}> Transaction History</span>
                                    <Table tableData={transactData} type={"transaction"} event={'test'}
                                           header={columns}/>
                                </Row>
                            </Col>
                            <Col className="transaction-label-column" md={4}>
                                <span className="transaction-label">Payment Method Details</span>
                                <div className="user-dashboard-footer">
                                    <span className="staff-members-header">Current Balance</span>
                                    <span className="staff-members" style={{marginBottom: "30px"}}>
                                        €{balance}
                                                   </span>
                                    <span className="staff-members-header">New Balance</span>
                                    <span className="staff-members" style={{marginBottom: "30px"}}>
                                                    €{parseInt(balance)+parseInt(funds)}
                                                  </span>

                                    <span className="staff-members-header">Minimum Deposit</span>
                                    <span className="staff-members" style={{marginBottom: "30px"}}>
                                        €1
                                                   </span>
                                    <span className="staff-members-header">Maximum Deposit</span>
                                    <span className="staff-members">
                                                    €100,000
                                                  </span>
                                </div>
                            </Col>
                        </>
                            : null
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
            <Snackbar open={successFund} autoHideDuration={4000} onClose={handleClose}>
                {successFund && (
                    <Alert onClose={handleClose} severity="success">
                        You have made request successfully!
                    </Alert>
                )}
            </Snackbar>
        </>

    );
}

export default UserTransactions;
