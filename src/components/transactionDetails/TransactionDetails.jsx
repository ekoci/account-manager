import React from "react";
import './TransactionDetails.css'
import {Container,Row,Col} from "react-bootstrap";
import {Icon} from 'semantic-ui-react'
import moment from "moment";

const  TransactionDetails = (props)=>{

    const {userName} = props.orderData;
    return(
        <>
            <div className="order-detail">
                <Row>
                    <Col>
                        <div className="order">
                            <span className="order-label">
                                Username
                            </span>
                            <span  className="order-element">
                                {props.orderData.userName}
                            </span>
                        </div>
                        <div className="mt-3 order">
                            <span className="order-label">
                                Payment Method
                            </span>
                            <span  className="order-element">
                                {props.orderData.paymentMethod.description}
                            </span>
                        </div>
                        <div className="mt-3 order">
                            <span className="order-label">
                                Amount
                            </span>
                            <span  className="order-element">
                                €{props.orderData.amount}
                            </span>
                        </div>
                        <div className="mt-3 order">
                            <span className="order-label">
                                Status
                            </span>
                            <span  className="order-element">

                                {props.orderData.transactionStatus}
                            </span>
                        </div>
                    </Col>

                    <Col>
                        <div className="order">
                            <span className="order-label">
                                E-Mail
                            </span>
                            <span  className="order-element">
                                {props.orderData.eMail}

                            </span>
                        </div>
                        <div className="mt-3 order">
                            <span className="order-label">
                                Transaction ID
                            </span>
                            <span  className="order-element">
                                {props.orderData.transactionId}
                            </span>
                        </div>
                        <div className="mt-3 order">
                            <span className="order-label">
                                Description
                            </span>
                            <span  className="order-element">
                                {props.orderData.description}
                            </span>
                        </div>
                        <div className="mt-3 order">
                            <span className="order-label">
                                Order Date
                            </span>
                            <span  className="order-element">
                                {moment(props.orderData.createdAt).format('DD MMM YYYY h:mm:ss')}
                            </span>
                        </div>
                    </Col>
                </Row>
            </div>
        </>

    );
}

export default TransactionDetails;
