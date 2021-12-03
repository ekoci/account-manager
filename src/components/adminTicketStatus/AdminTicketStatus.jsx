import React,{useState} from "react";
import {Row,Col} from "react-bootstrap";
import  './AdminTicketStatus.css'
import { Select } from 'semantic-ui-react'
import apiGtw from "../../api";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const statusOptions = [
    { key: 'opened', value: '1', text: 'Opened' },
    { key: 'pending', value: '2', text: 'pending' },
    { key: 'closed', value: '3', text: 'closed' },
    { key: 'new replies', value: '4', text: 'new replies' },
]




const AdminTicketStatus = (props)=>{

    const [status, setStatus]= useState();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const updateTicketStatus = async (status, ticket) => {
        try {
            const ticketData = ticket;
            const ticketStatus  = statusOptions.filter(obj => {
                return obj.value === status
            });
            ticketData.ticketStatus = {id: ticketStatus[0].value};
            // set loading to true before calling API
            const data = await apiGtw.put(
                'spotify/ticket/updateTicket',ticketData
            );
            setSuccess(true);
            window.location.reload();
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
    return(
        <>
            <div className="ticket-status">
                <div>
                    <span className="ticket-label">
                        Status
                    </span>
                    <Select placeholder='Select status' className="input-form status-dropdown"options={statusOptions}  required
                            onChange={ (e, { value }) => setStatus(value)}/>
                </div>
                <Row className="input-container">
                    <Col>
                        <button type="button" className="edit-button ticket-button" onClick={()=>updateTicketStatus(status, props.ticket)}>UPDATE</button>
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
                        You have updated ticket successfully!
                    </Alert>
                )}
            </Snackbar>
        </>

    );
}

export default AdminTicketStatus;


const test = (arg)=> async dispatch => {

}
