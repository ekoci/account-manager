import React from "react";
import {Row} from "react-bootstrap";
import './AdminTicketDetail.css'
const AdminTicketDetail = (props)=>{
    const dataTicket = props.ticketData;
    const userTicket  = dataTicket.user;
    const username = userTicket.username
    return(
        <>
            <Row className="admin-ticket-header">
                <span>Ticket Details</span>
            </Row>
        <div className="admin-ticket-detail">

            <Row className="admin-ticket-item">
                    <span className="font-weight-bold mb-1">
                        Username
                    </span>
                    <span>
                        {/*{username}*/}
                    </span>
            </Row>
            <Row className="admin-ticket-item mt-3">
                    <span className="font-weight-bold mb-1">
                        E-Mail
                    </span>
                    <span>
                        {/*{email}*/}
                    </span>
            </Row>
            <Row className="admin-ticket-item mt-3">
                    <span className="font-weight-bold mb-1">
                       Creation Date
                    </span>
                    <span>
                       {/*{props.ticketData.createdAt}*/}
                    </span>
            </Row>
            <Row className="admin-ticket-item mt-3">
                    <span className="font-weight-bold mb-1">
                        Last Update
                    </span>
                    <span>
                      {/*{props.ticketData.updatedAt}*/}
                    </span>
            </Row>
            <Row className="admin-ticket-item mt-3">
                    <span className="font-weight-bold mb-1">
                        Status
                    </span>
                    <span>
                        Pending
                    </span>
            </Row>
            <Row className="admin-ticket-item mt-3">
                    <span className="font-weight-bold mb-1">
                        User's Note
                    </span>
                    <span>
                        Eius impedit voluptates voluptas quaerat nam error. Dolor enim possimus dolorem ut prov…
                    </span>
            </Row>
        </div>
        </>
    );
}


export default AdminTicketDetail;
