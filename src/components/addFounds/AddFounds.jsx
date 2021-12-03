import React,{useState} from "react";
import {Container,Row,Col} from "react-bootstrap";
import { Select } from 'semantic-ui-react'
import apiGtw from "../../api";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const paymentMethodOptions = [
    { key: 'paypal', value: '1', text: 'Paypal' },
    { key: 'coinbase', value: '2', text: 'Coinbase' }
]


const AddFounds = (props)=>{
    const [payment, setPaymentMethod]= useState();
    const [transactionID, setTransactionID]= useState('');
    const [funds, setFunds]= useState('');

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const addFoundsFuntcion = async (e, paymentMethod, transactionId, funds, user) => {
        e.preventDefault();
        try {
            const fundsData = {};
            fundsData.amount = parseInt(funds);
            fundsData.createdAt = new Date();
            fundsData.description = null;
            fundsData.transactionId = transactionId;
            const paymentMethodObject  = paymentMethodOptions.filter(obj => {
                return obj.value === paymentMethod
            });
            fundsData.paymentMethod = {
                "id":paymentMethodObject[0].value,
                "description": paymentMethodObject[0].text
            };
            fundsData.transactionStatus = null;
            fundsData.user = user;
            const data = await apiGtw.post(
                'spotify/transaction/addFunds',fundsData
            );
            setSuccess(true);
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
            <form onSubmit={(e)=>addFoundsFuntcion(e, payment, transactionID, funds ,props.user)}>
            <div className="order-detail">
                <Row>
                    <span className="input-label">
                        Payment Method
                    </span>
                    {/*<input className="input-form"/>*/}
                    <Select placeholder='Select status' className="input-form status-dropdown"
                            options={paymentMethodOptions} required={true}
                            onChange={ (e, { value }) => setPaymentMethod(value)}/>
                </Row>
                <Row className="input-container">
                    <span className="input-label">
                        Transaction ID
                    </span>
                    <input className="input-form"  placeholder="Transaction ID" value={transactionID} required={true}
                              onChange={ (e) => setTransactionID(e.target.value)}/>
                </Row>
                <Row className="input-container">
                    <span className="input-label">
                            Funds
                        </span>
                        <input className="input-form" type="number" value={funds} required={true}
                               onChange={(e) => setFunds(e.target.value)}
                        />
                </Row>
                <Row className="input-container">
                    <Col style={{padding: '0px'}}>
                        <button type="submit" className="edit-button"  style={{padding: '13px 27px'}}
                                >
                            ADD FUNDS
                        </button>
                    </Col>
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
                        You have added funds successfully!
                    </Alert>
                )}
            </Snackbar>
        </>

    );
}

export default AddFounds;
