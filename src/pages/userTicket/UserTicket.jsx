import React, {useEffect, useState} from "react";
import {Container,Row,Col} from "react-bootstrap";
import {Icon} from 'semantic-ui-react';
import AdminTicketDetail from "../../components/adminTicketDetail/AdminTicketDetail";
import AdminTicketStatus from "../../components/adminTicketStatus/AdminTicketStatus";
import TicketChat from "../../components/ticketChat/TicketChat";
import apiGtw from "../../api";
import '../../components/adminTicketDetail/AdminTicketDetail.css'
import {Link} from "react-router-dom";
const UserTicket = (props)=>{
    const [ticketData, setTicket] = useState({});
    const [userData, setUser] = useState('');
    const [userEmail, setEmail] = useState('');
    const [statusData, setStatus] = useState('');
    useEffect(async () => {
        try {
            // // set loading to true before calling API
            // const data = await fetchTransactData(props.match.params.id);
            // console.log('AdminTicketChat',data)
            // setTicket(data);
            // setUser(data.user.username)
            // setEmail(data.user.email)
            // setStatus(data.ticketStatus.description)
        } catch (error) {
            // add error handling here
            console.log(error);
        }
    }, []);


    return(
        <>
            <div className="admin-transaction">
                <Row className="page-back-transaction">
                    <Link to={`/userTickets`}>
                        <Icon name='angle left' />
                        <span>Tickets</span>
                    </Link>

                </Row>
                <Row>
                    <span className="transaction-name">Ticket 311</span>
                </Row>
                <Row>
                    <Col className="transaction-label-column" md={8}>
                        <span className="transaction-label">Ticket Messages</span>
                        <TicketChat data={props}/>
                    </Col>
                    <Col className="transaction-label-column" md={4}>
                        <span className="transaction-label">Details</span>

                        <div className="user-dashboard-footer">
                            <span className="staff-members-header">Tickets In Queue</span>
                            <span className="staff-members" style={{marginBottom:"30px"}}>
                                                17</span>
                            <span className="staff-members-header">Support Members Online</span>
                            <span className="staff-members">
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
        </>

    );
}


export default UserTicket;