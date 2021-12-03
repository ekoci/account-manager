import React,{useState} from "react";
import {Container,Row,Col} from "react-bootstrap";
import './EditTransaction.css'
import { Select } from 'semantic-ui-react'
import apiGtw from "../../api";
import Alert from 'react-bootstrap/Alert'
import {CircularProgress, Snackbar} from "@material-ui/core";
const statusOptions = [
    { value: '1', text: 'confirmed' },
    { value: '2', text: 'pending' },
    { value: '3', text: 'rejected' },

]

const EditTransaction = (props)=>{

    const [status, setStatus]= useState();
    const [description, setDescription]= useState();

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const updateTransaction = async (e, status, description, adminTransaction) => {
        e.preventDefault();
        try {
            setLoading(true);
            const admindata = adminTransaction;
            const transactionStatus  = statusOptions.filter(obj => {
                return obj.value === status
            });
            admindata.description  = description;
            admindata.transactionStatus  = {id: transactionStatus[0].value};

            // set loading to true before calling API
            const data = await apiGtw.put(
                'spotify/transaction/updateTransaction',admindata
            );
            setSuccess(true);
            window.location.reload();
        } catch (error) {
            // add error handling here
            console.log(error);
            setError(true);
        }
        setLoading(false);
    };

    const handleClose = () => {
        setSuccess(false);
        setError(false);
    };

    return(
        <>
            <form onSubmit={(e)=>updateTransaction(e, status, description, props.adminTransaction)}>

            <div className="order-detail">
                <Row>
                    <span className="input-label">
                        Status
                    </span>
                    {/*<input className="input-form"/>*/}
                    <Select placeholder='Select status' className="input-form status-dropdown"options={statusOptions} required
                             onChange={ (e, { value }) => setStatus(value)} required/>
                </Row>
                <Row className="input-container">
                    <span className="input-label">
                        Description
                    </span>
                    <textarea className="input-form" rows="4" cols="50"  placeholder="Description" required
                              onChange={ (e) => setDescription(e.target.value)}/>
                </Row>
                <Row className="input-container">
                    <Col style={{padding: '0px'}}>
                        <button type="submit" className="edit-button"
                                style={{padding: '13px 27px'}}
                                >ISSUE REPLACEMENT</button>
                    </Col>
                </Row>
                <Row>
                    { loading ?
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
                        :null
                    }
                </Row>
            </div>

            </form>

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
                        You have edited successfully!
                    </Alert>
                )}
            </Snackbar>
        </>

    );
}

export default EditTransaction;
