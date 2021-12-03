import React from "react";
// import './TransactionDetails.css'
import {Container,Row,Col} from "react-bootstrap";
import {Icon} from 'semantic-ui-react'
import moment from "moment";

const UserDetails = (props)=>{
    return(
        <>
            <div className="order-detail">
                <Row>
                    <Col>
                        <div className="order">
                            <span className="order-label">
                                Total Amount Spent
                            </span>
                            <span  className="order-element">
                                 €{props.userDetailsData.amountSpent}
                            </span>
                        </div>
                        <div className="mt-3 order">
                            <span className="order-label">
                                Total Orders
                            </span>
                            <span  className="order-element">
                                {props.userDetailsData.totalOrders}
                            </span>
                        </div>
                        <div className="mt-3 order">
                            <span className="order-label">
                                Last Sign In
                            </span>
                            <span  className="order-element">
                                {moment(props.userDetailsData.lastSignIn).format('DD MMM YYYY h:mm:ss')}
                            </span>
                        </div>

                    </Col>

                    <Col>
                        <div className="order">
                            <span className="order-label">
                               Total Tickets
                            </span>
                            <span  className="order-element">
                                {props.userDetailsData.totalTickets}

                            </span>
                        </div>
                        <div className="mt-3 order">
                            <span className="order-label">
                                Total Accounts Purchased
                            </span>
                            <span  className="order-element">
                                €{props.userDetailsData.accountsPurchased}
                            </span>
                        </div>
                        <div className="mt-3 order">
                            <span className="order-label">
                                Sign Up Date
                            </span>
                            <span  className="order-element">
                                {moment(props.userDetailsData.signUpDate).format('DD MMM YYYY h:mm:ss')}

                            </span>
                        </div>
                    </Col>
                </Row>
            </div>
        </>

    );
}

export default UserDetails;