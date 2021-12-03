import React, {useState} from "react";
import {Container,Row,Col} from "react-bootstrap";
import './IssueReplacement.css'
import {Select} from "semantic-ui-react";
import apiGtw from "../../api";
import {Snackbar} from "@material-ui/core";
import Alert from "react-bootstrap/Alert";

const IssueReplacement = (props)=>{
    const [quantity, setQuantity]= useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const addIssue = async (e, issue, quantity) => {
        e.preventDefault();
        try {
            setLoading(true);
            const issueData = issue;
            issueData.quantity  = quantity;
            issueData.orderStatus={
                "id": 4,
                "description": "replacement",
                "notes": null
            }
            // set loading to true before calling API
            const response = await apiGtw.post(
                'spotify/order/addNew',issueData
            );
            setSuccess(true);
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
            <form onSubmit={(e)=> addIssue(e, props.issue, quantity)}>
                <Row>
                    <span className="issue-replacement">
                       Issue Replacement
                    </span>
                </Row>
                <Row>
                    <div className="issue-content">
                      <Row>
                    <span className="input-label">
                        Quantity
                    </span>
                            <input className="input-form"   type="number" value={quantity} required
                                   onChange={(e)=>setQuantity(e.target.value) }
                                     />
                        </Row>
                        <Row className="input-container">
                            <Col style={{padding:'0px'}}>
                                <button type="submit" className="edit-button"
                                         style={{padding:'13px 20px'}}>
                                    ISSUE REPLACEMENT
                                </button>
                            </Col>
                        </Row>
                    </div>
                </Row>

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
                        You have replaced issue successfully!
                    </Alert>
                )}
            </Snackbar>
        </>

    );
}

export default IssueReplacement;
