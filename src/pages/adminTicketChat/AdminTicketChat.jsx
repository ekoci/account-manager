import React, {useEffect, useState} from "react";
import {Container,Row,Col} from "react-bootstrap";
import {Icon} from 'semantic-ui-react';
import AdminTicketDetail from "../../components/adminTicketDetail/AdminTicketDetail";
import AdminTicketStatus from "../../components/adminTicketStatus/AdminTicketStatus";
import TicketChat from "../../components/ticketChat/TicketChat";
import apiGtw from "../../api";
import '../../components/adminTicketDetail/AdminTicketDetail.css'
import {Link} from "react-router-dom";
import moment from 'moment'
async function fetchTransactData(id) {
    const result = await apiGtw.get(
        'spotify/ticket/getById?ticketId='+id,
    );
    return result.data;
}
const AdminTicketChat = (props)=>{
    const [ticketData, setTicket] = useState({});
    const [userData, setUser] = useState('');
    const [userEmail, setEmail] = useState('');
    const [statusData, setStatus] = useState('');
    useEffect(async () => {
        try {
            // set loading to true before calling API
            const data = await fetchTransactData(props.match.params.id);
            setTicket(data);
            setUser(data.user.username)
            setEmail(data.user.email)
            setStatus(data.ticketStatus.description)
        } catch (error) {
            // add error handling here
            console.log(error);
        }
    }, []);


    return(
        <>
            <div className="admin-transaction">
                <Row className="page-back-transaction">
                    <Link to={`/AdminTickets`}>
                        <Icon name='angle left' />
                        <span>Tickets</span>
                    </Link>

                </Row>
                <Row>
                    <span className="transaction-name">Ticket {props.match.params.id}</span>
                </Row>
                <Row>
                    <Col className="transaction-label-column" lg={8} sm={12}>
                        <span className="transaction-label">Ticket Messages</span>
                        <TicketChat data={props} ticketData={ticketData}/>
                    </Col>
                    <Col className="transaction-label-column" lg={4} sm={12}>

                        <Row>
                            <AdminTicketStatus ticket={ticketData} />
                        </Row>
                        <Row>
                            <div className="admin-ticket-container">
                                <Row className="admin-ticket-header">
                                    <span>Ticket Details</span>
                                </Row>
                                <div className="admin-ticket-detail">

                                    <Row className="admin-ticket-item">
                                    <span className="font-weight-bold mb-1">
                                        Username
                                    </span>
                                        <span>
                                        {userData}
                                    </span>
                                    </Row>
                                    <Row className="admin-ticket-item mt-3">
                                    <span className="font-weight-bold mb-1">
                                        E-Mail
                                    </span>
                                        <span>
                                        {userEmail}
                                    </span>
                                    </Row>
                                    <Row className="admin-ticket-item mt-3">
                                    <span className="font-weight-bold mb-1">
                                       Creation Date
                                    </span>
                                        <span>
                                            {moment(ticketData.createdAt).format('DD MMM YYYY h:mm:ss')}
                                       {/*{ticketData.createdAt}*/}
                                    </span>
                                    </Row>
                                    <Row className="admin-ticket-item mt-3">
                                    <span className="font-weight-bold mb-1">
                                        Last Update
                                    </span>
                                        <span>
                                            {moment(ticketData.updatedAt).format('DD MMM YYYY h:mm:ss')}
                                      {/*{ticketData.updatedAt}*/}
                                    </span>
                                    </Row>
                                    <Row className="admin-ticket-item mt-3">
                                    <span className="font-weight-bold mb-1">
                                        Status
                                    </span>
                                        <span>
                                        {statusData}
                                    </span>
                                    </Row>
                                    <Row className="admin-ticket-item mt-3">
                                    <span className="font-weight-bold mb-1">
                                        User's Note
                                    </span>
                                        <span>
                                         {ticketData.notes}
                                    </span>
                                    </Row>
                                </div>
                            </div>

                        </Row>
                    </Col>
                </Row>
            </div>
        </>

    );
}


export default AdminTicketChat;