import React, {useEffect, useState} from "react";
import {Container, Row, Button, Col} from "react-bootstrap";
import {Icon, Select} from 'semantic-ui-react'
import apiGtw from "../../api";
import './AdminSettings.css'
import Notification from "../../components/notification/Notification";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
const AdminSettings = ()=>{
    const emailOptions =[
        { value: 'active', text: 'Active' },
        { value: 'inactive', text: 'Inactive' }
    ]
    const [coinBaseStatus, setCoinBaseStatus]= useState('');
    const [coinBaseStatusNew, setCoinBaseStatusNew]= useState('');
    const [coinBaseMinimum, setCoinBaseMinimum]= useState('');
    const [coinBaseMaximum, setCoinBaseMaximum]= useState('');
    const [coinBaseApi, setCoinBaseApi]= useState('');

    const [paypalStatus, setPaypalStatus]= useState('');
    const [paypalStatusNew, setPaypalStatusNew]= useState('');
    const [paypalMinimum, setPaypalMinimum]= useState('');
    const [paypalMaximum, setPaypalMaximum]= useState('');
    const [paypalEmail, setPaypalEmail]= useState('');

    const [manualStatus, setManualStatus]= useState('');
    const [manualStatusNew, setManualStatusNew]= useState('');
    const [manualText, setManualText]= useState('');

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const [responseData, setResponseData]= useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        setTimeout(function(){
            setResponseData(false); }, 3000);

    }, []);

    const updateSettings = async (evt) => {
        evt.preventDefault();
        const settingsData = [
            {
                "id": 1,
                "description": "paypal",
                "status": paypalStatus,
                "statusNewUsers":paypalStatusNew,
                "maximum": parseInt(paypalMinimum),
                "minimum": parseInt(paypalMaximum),
                "details": paypalEmail
            },
            {
                "id": 2,
                "description": "coinbase",
                "status": coinBaseStatus,
                "statusNewUsers": coinBaseStatusNew,
                "maximum":parseInt(coinBaseMinimum),
                "minimum": parseInt(coinBaseMaximum),
                "details": coinBaseApi
            },
            {
                "id": 3,
                "description": "manualPayment",
                "status": manualStatus,
                "statusNewUsers": manualStatusNew,
                "maximum":null,
                "minimum": null,
                "details": manualText
            }
        ]

        try {
            setLoading(true);
            const data = await apiGtw.put(
                '/spotify/paymentMethod/updateSettings',
                    JSON.stringify(settingsData),
                { headers: {'Content-Type': 'application/json'} }
            );
            setResponseData(true);
            setSuccess(true);
        }catch (error){
            setError(true);
        }
        setLoading(false);
    }
    const handleClose = () => {
        setSuccess(false);
        setError(false);
    };
    return(
        <>
            <div className="settings-margin">
                {/*{*/}
                {/*    responseData ? <Notification variant={"success"} content={"test"}*/}
                {/*                                 onClose={()=>setResponseData(false)}/>*/}
                {/*        : null*/}
                {/*}*/}
                <div className="admin-add-products mb-5">
                    <form onSubmit={(event => updateSettings(event))}>
                    <Row>
                    <span className="admin-products-title">
                        Settings
                    </span>
                    </Row>
                    <Row>
                    <span className="admin-products-label">
                        General Settings
                    </span>
                    </Row>
                    <Row className="admin-settings mt-4">
                        <Row  className="mt-4" style={{width:"100%"}}>
                            <Col>
                                <span className="input-label">
                                    Coinbase Status
                                </span>
                                <Select placeholder='Select Coinbase Status'
                                        className="input-form status-dropdown" options={emailOptions} required
                                        onChange={(e, { value }) => setCoinBaseStatus(value)}
                                />
                            </Col>
                            <Col>
                                <span className="input-label">
                                        Coinbase Status For New Users
                                    </span>
                                <Select placeholder='Select Coinbase Status For New Users'
                                        className="input-form status-dropdown" options={emailOptions} required
                                        onChange={(e, { value }) => setCoinBaseStatusNew(value)}
                                />

                            </Col>
                        </Row>
                        <Row style={{width:"100%"}} className="mt-4">
                            <Col>

                                <span className="input-label">
                                        Coinbase Minimum
                                    </span>
                                <input className="input-form" placeholder="Coinbase Minimum" required type="number"
                                       onChange={(e) => setCoinBaseMinimum(e.target.value)}
                                />

                            </Col>
                            <Col>
                                <span className="input-label">
                                        Coinbase Maximum
                                    </span>
                                <input className="input-form" placeholder="Coinbase Maximum" required type="number"
                                       onChange={(e) => setCoinBaseMaximum(e.target.value)}/>

                            </Col>
                        </Row>
                        <Row className="mt-4" style={{width:"100%"}}>
                            <Col>
                                <span className="input-label">
                                        Coinbase API Key
                                    </span>
                                <input className="input-form" placeholder="Coinbase API Key" required type="text"
                                       onChange={(e) => setCoinBaseApi(e.target.value)}/>
                            </Col>
                        </Row>

                    </Row>
                    <Row className="admin-settings mt-4">
                        <Row  className="mt-4" style={{width:"100%"}}>
                            <Col>
                                <span className="input-label">
                                        PayPal Status
                                    </span>
                                <Select placeholder='PayPal Status'
                                        className="input-form status-dropdown" options={emailOptions} required
                                        onChange={(event,{ value }) => setPaypalStatus(value)}
                                />
                            </Col>
                            <Col>
                                <span className="input-label">
                                        PayPal For New Users
                                    </span>
                                <Select placeholder='PayPal For New Users'
                                        className="input-form status-dropdown" options={emailOptions} required
                                        onChange={(e, { value }) => setPaypalStatusNew(value)}
                                />

                            </Col>
                        </Row>
                        <Row style={{width:"100%"}} className="mt-4">
                            <Col>
                                <span className="input-label">
                                        PayPal Minimum
                                    </span>
                                <input className="input-form" placeholder="PayPal Minimum" required type="number"
                                       onChange={(e) => setPaypalMinimum(e.target.value)}/>

                            </Col>
                            <Col>
                                <span className="input-label">
                                        PayPal Maximum
                                    </span>
                                <input className="input-form" placeholder="PayPal Maximum" required type="number"
                                       onChange={(e) => setPaypalMaximum(e.target.value)}/>

                            </Col>
                        </Row>
                        <Row className="mt-4" style={{width:"100%"}}>
                            <Col>
                                <span className="input-label">
                                        PayPal E-Mail
                                    </span>
                                <input className="input-form" placeholder="PayPal E-Mail" required type="email"
                                       onChange={(e) => setPaypalEmail(e.target.value)}/>
                            </Col>
                        </Row>

                    </Row>
                    <Row className="admin-settings mt-4">
                        <Row style={{width:"100%"}}>
                            <Col>
                                <span className="input-label">
                                        Manual Payment Status
                                    </span>
                                <Select placeholder='Manual Payment Status'
                                        onChange={(e, { value }) => setManualStatus(value)}
                                        className="input-form status-dropdown mb-4" options={emailOptions} required
                                />
                                <span className="input-label">
                                        Manual Payment For New Users
                                    </span>
                                <Select placeholder='Manual Payment For New Users'
                                        onChange={(e, { value }) => setManualStatusNew(value)}
                                        className="input-form status-dropdown" options={emailOptions} required
                                />
                            </Col>
                            <Col>
                                 <span className="input-label">
                                        Manual Payment Text
                                    </span>
                                <textarea className="input-form" placeholder="Manual Payment Text"
                                          onChange={(e) => setManualText(e.target.value)}
                                          rows="4" cols="50" style={{height:"80%"}}
                                          required/>
                            </Col>
                        </Row>
                    </Row>
                    <Row className="mt-4">
                        <Col style={{padding: '0px'}}>
                            <button type="submit" className="edit-button"
                                    style={{padding: '13px 27px'}}
                            >
                                SAVE SETTINGS
                            </button>
                        </Col>
                    </Row>


                    </form>
                </div>
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
                        You have set settings successfully!
                    </Alert>
                )}
            </Snackbar>
        </>

    );
}

export default AdminSettings;
