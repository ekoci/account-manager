import React, {useState} from "react";
import {Container,Row,Col} from "react-bootstrap";
import '../issueReplacement/IssueReplacement.css'
import {Select} from "semantic-ui-react";
import apiGtw from "../../api";
import {Snackbar} from "@material-ui/core";
import Alert from "react-bootstrap/Alert";

const statusOptions = [
    { key: 'completed', value: '1', text: 'Completed' },
    { key: 'canceled', value: '2', text: 'Canceled' },
    { key: 'processing', value: '3', text: 'Processing' },
    { key: 'replacement', value: '4', text: 'Replacement' },
]

const OrderStatus = (props)=>{
    const [status, setStatus]= useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const updateOrder = async (e, order, status) => {
        e.preventDefault();
        const orderStatus = statusOptions.filter(sts => sts.value == status);
        try {
            setLoading(true);
            const issueData = order;
            issueData.orderStatus={
                "id": orderStatus[0].value,
                "description":orderStatus[0].key,
                "notes": null
            };
            // set loading to true before calling API
            const response = await apiGtw.put(
                'spotify/order/updateOrder',issueData
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
            <form onSubmit={(e)=> updateOrder(e, props.issue, status)}>
                <Row>
                    <span className="issue-replacement">
                       Order Status
                    </span>
                </Row>
                <Row>
                    <div className="issue-content">
                        <Row>
                    <span className="input-label">
                        Order Status
                    </span>
                            <Select placeholder='Select status' className="input-form status-dropdown"options={statusOptions}  required
                                    onChange={ (e, { value }) => setStatus(value)}/>
                        </Row>
                        <Row className="input-container">
                            <Col style={{padding:'0px'}}>
                                <button type="submit" className="edit-button" disabled={status===''}
                                        style={{padding:'13px 20px'}}>
                                    ORDER STATUS
                                </button>
                            </Col>
                        </Row>
                    </div>
                </Row>

            </form>
            <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
                {error && (
                    <Alert onClose={handleClose} severity="error">
                        Error! Couldn't process request!
                    </Alert>
                )}
            </Snackbar>
            <Snackbar open={success} autoHideDuration={2000} onClose={handleClose}>
                {success && (
                    <Alert onClose={handleClose} severity="success">
                        You have replaced issue successfully!
                    </Alert>
                )}
            </Snackbar>
        </>

    );
}

export default OrderStatus;
