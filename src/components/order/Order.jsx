import React, {useEffect, useState} from "react";
// import './TransactionDetails.css'
import {Container,Row,Col} from "react-bootstrap";
import moment from "moment";


const Order = (props)=>{
    const [orderData, setOrder] = useState('');
    useEffect(async () => {
        try {
            // set loading to true before calling API
            setOrder(props.order.user)
        } catch (error) {
            // add error handling here
            console.log(error);
        }
    }, []);
    // const transactionStatus = props.orderData.transactionStatus;
    // const description= transactionStatus.description;
    // console.log('props.orderData.transactionStatus',description)
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
                                {orderData}
                            </span>
                        </div>
                        <div className="mt-3 order">
                            <span className="order-label">
                                Product
                            </span>
                            <span  className="order-element">
                                test
                            </span>
                        </div>
                        <div className="mt-3 order">
                            <span className="order-label">
                                Quantity
                            </span>
                            <span  className="order-element">
                                Quantity
                            </span>
                        </div>
                        <div className="mt-3 order">
                            <span className="order-label">
                                Status
                            </span>
                            <span  className="order-element">
                                {/*{props.orderData.transactionStatus.description}*/}
                            </span>
                        </div>
                    </Col>

                    <Col>
                        <div className="order">
                            <span className="order-label">
                                E-Mail
                            </span>
                            <span  className="order-element">
                                {/*{props.orderData.eMail}*/}
                            </span>
                        </div>
                        <div className="mt-3 order">
                            <span className="order-label">
                                Filters
                            </span>
                            <span  className="order-element">
                               {/*{props.orderData.transactionId}*/}
                            </span>
                        </div>
                        <div className="mt-3 order">
                            <span className="order-label">
                                Value
                            </span>
                            <span  className="order-element">
                                {/*{props.orderData.description}*/}
                            </span>
                        </div>
                        <div className="mt-3 order">
                            <span className="order-label">
                                Order Date
                            </span>
                            <span  className="order-element">
                                {/*{moment(props.orderData.createdAt).format('DD MMM YYYY h:mm:ss')}*/}
                            </span>
                        </div>
                    </Col>
                </Row>
            </div>
        </>

    );
}

export default Order;