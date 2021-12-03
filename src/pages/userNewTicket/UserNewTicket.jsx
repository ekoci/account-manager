import React, {useState, useEffect} from 'react';
import {Container, Row, Button, Nav, Col} from "react-bootstrap";
import apiGtw from '../../api';
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useHistory} from "react-router-dom";

async function fetchTransactData(id) {
    const result = await apiGtw.get(
        'spotify/user/getById?userId=' + id,
    );
    return result.data;
}

const UserNewTickets = () => {
    const history = useHistory();
    const [tittle, setTittle] = useState();
    const [description, setDescription] = useState();
    const [userData, setData] = useState({hits: []});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await fetchTransactData(localStorage.getItem('token'));
            setData(data);
            // switch loading to false after fetch is complete
        } catch (error) {
            // add error handling here
            console.log(error);
        }
        setLoading(false);
    }, []);

    const newTicket = async (e, tittle, description, userData) => {
        e.preventDefault();
        const newTicketData = {
            "notes": description,
            "title": tittle,
            "ticketStatus": {
                "id": 1,
                "description": "canceled"
            },
            "user": userData
        }
        try {

            // set loading to true before calling API
            const data = await apiGtw.post(
                '/spotify/ticket/addNew', newTicketData
            );
            setSuccess(true);
            console.log(data)
            history.push("/userTickets/userTicket" + data.data.id);
        } catch (error) {
            // add error handling here
            console.log(error);
            setError(true);
        }
    };


    const handleClose = () => {
        setSuccess(false);
        setError(false);
    };
    return (
        <>
            <div className="admin-transaction">
                <Row style={{marginLeft: '-30px'}}>
                    <span className="admin-transaction-tittle">
                        Tickets
                    </span>
                </Row>
                <Row>
                    <Col className="transaction-label-column" md={8}>
                        <Row>
                            <span className="transaction-label">New Ticket</span>
                        </Row>
                        <Row>
                            <form style={{width: "100%"}} onSubmit={(e) => newTicket(e, tittle, description, userData)}>

                                <div className="order-detail">
                                    <div>
                                    <span className="input-label">
                                        Title
                                    </span>
                                        <input className="input-form" placeholder="Tittle" required
                                               onChange={(e) => setTittle(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-container">
                                    <span className="input-label">
                                        Description
                                    </span>
                                        <textarea className="input-form" rows="4" cols="50" placeholder="Description"
                                                  required
                                                  onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-container">
                                        <Col style={{padding: '0px'}}>
                                            <button type="submit" className="edit-button"
                                                    style={{padding: '13px 27px'}}
                                            >NEW TICKET
                                            </button>
                                        </Col>
                                    </div>
                                </div>

                            </form>
                        </Row>
                    </Col>
                    <Col className="transaction-label-column" md={4} style={{paddingLeft: "30px"}}>
                        <span className="transaction-label">Details</span>

                        <div className="user-dashboard-footer">
                            <span className="staff-members-header">Tickets In Queue</span>
                            <span className="staff-members" style={{marginBottom: "30px"}}>
                                                17</span>
                            <span className="staff-members-header">Support Members Online</span>
                            <span className="staff-members" style={{marginBottom: "30px"}}>
                                                2
                                              </span>
                            <span className="staff-members-header">Priority Support</span>
                            <span className="staff-members">
                                                No
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
                        You have created ticket successfully!
                    </Alert>
                )}
            </Snackbar>
        </>

    );
}

export default UserNewTickets;
