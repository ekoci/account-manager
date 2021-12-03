import React, {useEffect, useState} from "react";
import './AdminOrder.css'
import {Container, Row, Col} from "react-bootstrap";
import {Icon} from 'semantic-ui-react';
import OrderDetails from "../../components/transactionDetails/TransactionDetails";
import IssueReplacement from "../../components/issueReplacement/Replacement";
import Order from "../../components/order/Order";
import apiGtw from "../../api";
import {Link} from "react-router-dom";
import moment from 'moment'
import {CircularProgress, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import OrderStatus from "../../components/orderStatus/OrderStatus";

async function fetchTransactData(id) {
    const result = await apiGtw.get(
        'spotify/order/getById?orderId=' + id,
    );
    return result.data;
}

const AdminOrder = (props) => {
    const [orderData, setOrder] = useState({});
    const [issueData, setIssue] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await fetchTransactData(props.match.params.id);
            console.log('admin order', data)
            setIssue(data);
            const {value, orderDate, description, id, user, product, orderStatus, quantity} = data;
            const filters = data.filters
            const orderDetails = {
                id:id,
                value: value,
                orderDate: orderDate,
                description: description,
                userName: user.username,
                eMail: user.email,
                product: product.title,
                status: orderStatus,
                quantity: quantity,
                filtersOrder: filters.length
            }
            setOrder(orderDetails);
            setSuccess(true);
            // switch loading to false after fetch is complete

        } catch (error) {
            // add error handling here
            console.log(error);
            setError(true);
        }
        setLoading(false);
    }, []);

    const handleClose = () => {
        setSuccess(false);
        setError(false);
    };
    const downloadAccounts = async (event, id) => {
        event.preventDefault();
        try{
            // setLoading(true);
            const downResult = await apiGtw.get(
                '/spotify/order/downloadOrderAccounts?orderId='+id,
            );
            const element = document.createElement("a");
            const file = new Blob([downResult.data], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = "accounts.txt";
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
            // setSuccess(true);
        }catch (e){
            console.log(e);
            // setDownloadError(true)
        }
        setLoading(false);
    };
    return (
        <>
            {loading ?
                (
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
                )
                :
                success ?
                    <>
                <div className="admin-transaction">
                    <Row className="page-back-transaction">
                        <Link to={`/adminOrders`}>
                            <Icon name='angle left'/>
                            <span>Orders</span>
                        </Link>
                    </Row>
                    <Row>
                        <span className="transaction-name">Order {props.match.params.id}</span>
                    </Row>
                    <Row>
                        <Col className="transaction-label-column">
                            <span className="transaction-label">Order Details</span>
                            {/*<Order order={orderData}/>*/}
                            <div className="order-detail">
                                <Row>
                                    <Col>
                                        <div className="order">
                            <span className="order-label">
                                Username
                            </span>
                                            <span className="order-element">
                                {orderData.userName}
                            </span>
                                        </div>
                                        <div className="mt-3 order">
                            <span className="order-label">
                                Product
                            </span>
                                            <span className="order-element">
                               {orderData.product}

                            </span>
                                        </div>
                                        <div className="mt-3 order">
                            <span className="order-label">
                                Quantity
                            </span>
                                            <span className="order-element">
                                 {orderData.quantity}
                            </span>
                                        </div>
                                        <div className="mt-3 order">
                            <span className="order-label">
                                Status
                            </span>
                                            <span className="order-element">
                                {orderData.status}
                            </span>
                                        </div>
                                    </Col>

                                    <Col>
                                        <div className="order">
                            <span className="order-label">
                                E-Mail
                            </span>
                                            <span className="order-element">
                                {orderData.eMail}
                            </span>
                                        </div>
                                        <div className="mt-3 order">
                            <span className="order-label">
                                Filters
                            </span>
                                            <span className="order-element">

                               {orderData.filtersOrder}
                            </span>
                                        </div>
                                        <div className="mt-3 order">
                            <span className="order-label">
                                Value
                            </span>
                                            <span className="order-element">
                               {orderData.value}
                            </span>
                                        </div>
                                        <div className="mt-3 order">
                            <span className="order-label">
                                Order Date
                            </span>
                                            <span className="order-element">
                                {moment(orderData.orderDate).format('DD MMM YYYY h:mm:ss')}
                            </span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col className="transaction-label-column">


                            {orderData.status == 'completed' ?
                                <Row>
                                    <div className="purchased-account">
                                        <span className="purchased-account-label">Purchased Accounts</span>
                                        <button type="button" className="edit-button "
                                                onClick={(e)=>downloadAccounts(e, orderData.id)}>DOWNLOAD ACCOUNTS</button>
                                    </div>
                                </Row>
                                :null
                            }


                            <Col>
                                <IssueReplacement issue={issueData}/>
                            </Col>

                            <Col>
                                <OrderStatus issue={issueData}/>
                            </Col>

                        </Col>

                    </Row>
                </div>
                    </>
                        :null
            }
            <Snackbar open={error} autoHideDuration={4000} onClose={handleClose}>
                {error && (
                    <Alert onClose={handleClose} severity="error">
                        Error! Couldn't process request!
                    </Alert>
                )}
            </Snackbar>
        </>
    );
}

export default AdminOrder;
