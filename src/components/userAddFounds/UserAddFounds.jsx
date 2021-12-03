import React,{useState} from "react";
import {Container,Row,Col} from "react-bootstrap";
// import './EditTransaction.css'
import { Select } from 'semantic-ui-react'
import apiGtw from "../../api";
import { useHistory } from 'react-router-dom';
const paymentMethodOptions = [
    { key: 'paypal', value: 'paypal', text: 'Paypal' },
    { key: 'coinbase', value: 'coinbase', text: 'Coinbase' }
]


const UserAddFounds = (props)=>{
    const [payment, setPaymentMethod]= useState();
    const [funds, setFunds]= useState('');
    const history = useHistory();
    const addFoundsFuntcion = async (e, paymentMethod,funds) => {
        e.preventDefault();
            // try {
            //     const data = await apiGtw.post(
            //         'spotify/transaction/addFunds',fundsData
            //     );
            //     console.log(data);
            //     // console.log(data)
            // } catch (error) {
            //     // add error handling here
            //     console.log(error);
            // }
    };

    return(
        <>
            <form style={{
                width:'100%',
                marginBottom:'68px',
                marginRight:'30px'
            }} onSubmit={(event)=>{ (payment ==='paypal') ? history.push('/userTransactions/userPaypal'+funds+"test@tes.com"): addFoundsFuntcion(event,payment,funds )

            }}>
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
        </>

    );
}

export default UserAddFounds;