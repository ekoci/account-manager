import React, {useEffect, useState} from "react";
import {Container, Row, Button, Col} from "react-bootstrap";
import {Icon, Select} from 'semantic-ui-react'
import apiGtw from "../../api";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

async function fetchTransactData(id) {
    console.log(id)
    const result = await apiGtw.get(
        'spotify/user/getById?userId='+id,
    );
    return result.data;
}

const UserSettings = () => {

    const emailOptions = [
        {key: 'active', value: '1', text: 'Active'},
        {key: 'inactive', value: '0', text: 'Inactive'}
    ]
    const [userData, setUserData] = useState({});
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [emailNotification, setEmailNotification] = useState();
    const [loading, setLoading] = useState(false);


    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isMatching, setIsMatching] = useState(true);

    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await fetchTransactData(localStorage.getItem('token'));
            setEmail(data.email)
            setEmailNotification(data.emailNotification)
            setUserData(data)
            // switch loading to false after fetch is complete
        } catch (error) {
            // add error handling here
            setError(true);
            console.log(error);
        }
        setLoading(false);

    }, []);
    const updateUser = async (evt) => {
        const user = userData
        user.email = email
        user.password = password
        user.emailNotification = emailNotification
        console.log('user', user)
        evt.preventDefault();
        if (password !== repeatPassword) {
            setIsMatching(false);
            return;
        }
        try {
            const data = await apiGtw.put(
                'spotify/user/update', user
            );
            console.log(data);
            setSuccess(true);
        } catch (error) {
            console.log(error);
            setError(true);
        }

    }
    const handleClose = () => {
        setSuccess(false);
        setError(false);
    };
    return (
        <>
            <Container>
                <div className="admin-add-products">
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
                    <Row>
                        <Container className='product-form'>
                            <form onSubmit={(event) => {
                                updateUser(event)
                            }}>
                                <Col>
                                    <Row>
                                    <span className="input-label">
                                        Username
                                    </span>
                                    </Row>
                                    <Row className="mt-3">
                                    <span className="input-label">
                                        Bleanter
                                    </span>
                                    </Row>
                                </Col>
                                <Row className="mt-4">
                                    <Col>
                                        <span className="input-label">
                                            E-Mail
                                        </span>
                                        <input className="input-form" placeholder="E-Mail" required value={email}
                                               onChange={(e) => setEmail(e.target.value)}/>
                                    </Col>
                                </Row>

                                <Row className="mt-4">
                                    <Col>
                                           <span className="input-label">
                                        E-Mail Notifications
                                    </span>
                                        <Select placeholder='Select E-Mail Notifications' value={emailNotification}
                                                onChange={(e, {value}) => setEmailNotification(value)}
                                                className="input-form status-dropdown" options={emailOptions} required
                                        />
                                    </Col>

                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <span className="input-label">
                                            Password
                                        </span>
                                        <input className="input-form" placeholder="Password" type="password"
                                               onChange={(e) => setPassword(e.target.value)}/>
                                    </Col>
                                    <Col>
                                        <span className="input-label">
                                            Repeat Password
                                        </span>
                                        <input className="input-form" placeholder="Repeat Password" type="password"
                                               onChange={(e) => setRepeatPassword(e.target.value)}/>
                                    </Col>

                                </Row>
                                <Row style={{
                                    justifyContent: 'center',
                                    marginTop: '15px'
                                }}>
                                    <p
                                        style={
                                            !isMatching
                                                ? {
                                                    color: "rgb(228 84 84 / 81%)",
                                                    display: "block",
                                                    textDecoration: "underline",
                                                }
                                                : {visibility: "hidden"}
                                        }
                                    >
                                        Passwords don't match!
                                    </p>

                                </Row>

                                <Row className="input-container">
                                    <Col>
                                        <button type="submit" className="add-product-button">UPDATE</button>
                                    </Col>
                                </Row>
                            </form>
                        </Container>
                    </Row>
                </div>
            </Container>
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
                        You have upapated settings successfully!
                    </Alert>
                )}
            </Snackbar>
        </>

    );
}

export default UserSettings;
