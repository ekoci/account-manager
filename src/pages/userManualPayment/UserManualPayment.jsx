import React, { useState, useEffect } from 'react';
import { Row, Nav, Col} from "react-bootstrap";
import apiGtw from '../../api';
import {Link} from "react-router-dom";
async function fetchTransactData() {
    const result = await apiGtw.get(
        '/spotify/transaction/usersTransactions?uuid=1',
    );
    return result.data;
}
const UserManualPayments = ()=>{

    const [transactData, setData] = useState({ hits: [] });
    const [loading, setLoading] = useState(false);
    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await fetchTransactData();
            setData(data);
            console.log(data)
            // switch loading to false after fetch is complete
            setLoading(false);
        } catch (error) {
            // add error handling here
            setLoading(false);
            console.log(error);
        }
    }, []);

    return(
        <>
            <div className="admin-transaction">
                <Row style={{marginLeft:'-30px'}}>
                    <span className="admin-transaction-tittle">
                        Add Funds
                    </span>
                </Row>
                <Row>
                    { loading ?
                        <span>loading</span>
                        :
                        <>
                            <Col className="transaction-label-column" md={8}>
                                <Row>
                                    <span className="transaction-label" style={{marginBottom:"30px"}}>Manual Payment Method</span>
                                    <div style={{
                                        background: '#1B1B1B 0% 0% no-repeat padding-box',
                                        borderRadius: '9px',
                                        opacity: 1,
                                        padding: '30px',
                                        font: 'normal normal normal 14px/17px Roboto',
                                        color: '#CCCCCC'
                                    }}>
                                        For the minority of our clients which don't use cryptocurrencies or PayPal we also accept other payment methods like Skrill, Payeer,
                                        Revolute & Cash App. To make a deposit using this payment methods, please contact our support team using the button on the right section.
                                        Even if your preferred payment method is not mentioned here feel free to message the support team anyway.
                                    </div>

                                </Row>
                            </Col>
                            <Col className="transaction-label-column" md={4} style={{paddingLeft:"30px"}}>
                                <span className="transaction-label">Contact Support</span>
                                <div className="user-new-ticket">
                                 <span className="user-new-ticket-header">
                                    Contact Support
                                 </span>
                                    <Link to='/userTickets/userNewTicket'>
                                        <button type="submit" style={{padding: '13px 27px'}}
                                                className="edit-button">CONTACT SUPPORT</button>
                                    </Link>

                                    <span className="user-new-ticket-label">
                                    Our support team will give you more details and guide you through the manual deposit process.
                                 </span>
                                </div>
                            </Col>
                        </>
                    }
                </Row>

            </div>
        </>

    );
}

export default UserManualPayments;