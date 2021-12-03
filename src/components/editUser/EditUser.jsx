import React, {useState} from "react";
// import './TransactionDetails.css'
import {Container,Row,Col} from "react-bootstrap";
import {Icon, Select} from 'semantic-ui-react';
import { Radio } from 'semantic-ui-react';
import "./EditUser.css"
import apiGtw from "../../api";
import {CircularProgress, Snackbar} from "@material-ui/core";
import Alert from "react-bootstrap/Alert";
const statusOptions = [
    {  value: '1', text: 'Inactive' },
    {  value: '2', text: 'Active' }
]

const EditUser = (props)=>{
    const user = props.user;
    const [username, setUsername]= useState(user.username);
    const [password, setPassword]= useState('');
    const [balance, setBalance]= useState(user.balance);
    const [description, setDescription]= useState('');
    const [email, setEmail]= useState(user.email);
    const [repeatPassword, setRepeatPassword]= useState('');
    const [status, setStatus]= useState();
    const [coinBase, setcoinBase]= useState(false);
    const [paypal, setpaypal]= useState(false);
    const [manual, setmanual]= useState(false);


    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isMatching, setIsMatching] = useState(true);

    const editUserFunction = async (evt) => {
        evt.preventDefault();
        try {
            if (password !== repeatPassword) {
                setIsMatching(false);
                return;
            }
            setLoading(true);
            const userData = props.user;
            const payment = []
            if(coinBase){
                payment.push({
                    id:1,
                    description:'coinbase'
                })
            }
            if(paypal) {
                payment.push({
                    id: 2,
                    description: 'paypal'
                })
            }
            if(manual) {
                payment.push({
                    id: 3,
                    description: 'manual'
                })
            }
            userData.balance= balance;
            userData.email= email;
            userData.password= password;
            userData.username= username;
            const statusData  = statusOptions?.filter(obj => {
                return obj.value === status
            });
            console.log(statusData)
            userData.userStatus= {
                id: statusData.length ===0 ? 2 :  statusData[0].value,
                description: statusData.length ===0 ? 'Active' : statusData[0].text
            };
            userData.paymentMethods= payment;

            const data = await apiGtw.put(
                'spotify/user/update',userData
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
            <div className="order-detail">
                <form onSubmit={editUserFunction}>
                <Row>
                    <Col className="edit-user">
                        <Row>
                        <span className="input-label">
                            Username
                        </span>
                            {/*<input className="input-form"/>*/}
                            <input className="input-form" placeholder="username" value={username} required={true}
                                   onChange={(e) => setUsername(e.target.value)}/>
                        </Row>
                        <Row className="input-container">
                        <span className="input-label">
                            Password
                        </span>
                            <input className="input-form" placeholder="Password" type="password"
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </Row>
                        <Row className="input-container">
                        <span className="input-label">
                                Balance
                            </span>
                            <input className="input-form" type="number" value={balance} placeholder="Balance"
                                   onChange={(e) => setBalance(e.target.value)} required={true}
                            />
                        </Row>
                        <Row className="input-container">
                        <span className="input-label">
                                Description
                            </span>
                            <textarea className="input-form" value={description}  placeholder={"Description"}
                                   onChange={(e) => setDescription(e.target.value)}
                            />
                        </Row>
                    </Col >
                    <Col className="edit-user">
                        <Row>
                        <span className="input-label">
                            E-Mail
                        </span>
                            <input className="input-form" placeholder="E-Mail" value={email} required={true} type={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </Row>
                        <Row className="input-container">
                        <span className="input-label">
                            Repeat Password
                        </span>
                            <input className="input-form" placeholder="Repeat Password" value={repeatPassword}  type="password"
                                   onChange={(e) => setRepeatPassword(e.target.value)}/>
                        </Row>
                        <Row className="input-container">
                        <span className="input-label">
                                Status
                            </span>
                            <Select placeholder='Select status' className="input-form status-dropdown" options={statusOptions} required={true}
                                    onChange={ (e, { value }) => setStatus(value)}/>
                        </Row>
                        <Row className="input-container">
                            <div>
                                 <span className="input-label">
                                   Payment Methods
                                </span>
                                <div className="user-toggel">
                                    <div className="user-payment">
                                        <span className="user-label">Coinbase</span>
                                        <Radio toggle style={{marginTop:'20px'}} checked={coinBase}
                                               onChange={()=>setcoinBase(!coinBase)}/>
                                    </div>
                                    <div className="user-payment">
                                        <span className="user-label">PayPal</span>
                                        <Radio toggle   style={{marginTop:'20px'}} checked={paypal}
                                               onChange={()=>setpaypal(!paypal)}/>
                                    </div>
                                    <div className="user-payment">
                                        <span className="user-label">Manual Payment Method</span>
                                        <Radio toggle  style={{marginTop:'20px'}}  checked={manual} className="test"
                                               onChange={
                                               (event, {value}) => setmanual(!manual)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Row>
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
                    <Col >
                        <button type="submit" style={{padding: '13px 27px'}}
                                className="edit-button">UPDATE</button>
                    </Col>
                </Row>
                    <Row>
                        { loading ?
                            <div style={{
                                'width': '100%',
                                'align-items': 'center',
                                'display': 'flex',
                                'justify-content': 'center'
                            }}>
                                <CircularProgress
                                    color="#00BC87"
                                    style={{ color: "#00BC87!important" }}
                                />
                            </div>
                            :null
                        }
                    </Row>
                </form>
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
                        You have edited user successfully!
                    </Alert>
                )}
            </Snackbar>
        </>

    );
}

export default EditUser;
