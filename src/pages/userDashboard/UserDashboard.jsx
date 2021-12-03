import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Dropdown, ProgressBar} from "react-bootstrap";
import './LandingDashboard.css'
import apiGtw from "../../api";
import footerImage from "../../assets/landing_photo.svg";
import moment from "moment";
import UserAnnouncements from "../../components/userAnnouncement/userAnnouncement";
import {Link} from "react-router-dom";
import {CircularProgress, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";


async function fetchTransactData(id) {
    const result = await apiGtw.get(
        '/spotify/user/userDetails?userId='+id,
       { headers: {
            'authorization-uuid' : localStorage.getItem('token'),
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }}
    );
    return result.data;
};
async function fetchOrdersInDash(id) {
    const result = await apiGtw.get(
        '/spotify/dashboard/usersOrders?usersId='+id,
        { headers: {
            'authorization-uuid' : localStorage.getItem('token'),
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }}
    );
    return result.data;
}
async function fetchTicketsInDash(id) {
    const result = await apiGtw.get(
        '/spotify/dashboard/usersTickets?usersId='+id,
        { headers: {
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'authorization-uuid' : localStorage.getItem('token'),
        }}
    );
    return result.data;
}
const UserDashboard = () => {

    const [dashboardData, setData] = useState({});
    const [ordersData, setOrders] = useState({});
    const [ticketsData, setTickets] = useState({});
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await fetchTransactData(localStorage.getItem('token'));
            setData(data);
            console.log(data)
            const orders= await fetchOrdersInDash(localStorage.getItem('token'));
            setOrders(orders);
            console.log(orders)
            const tickets= await fetchTicketsInDash(localStorage.getItem('token'));
            setTickets(tickets);
            console.log(tickets)
            // switch loading to false after fetch is complete
            setSuccess(true);
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
    return (
        <div className='homepage'>
            <Col style={{paddingTop: 48}}>
                <span className="dashboard-title">Dashboard</span>
                <div style={{paddingLeft: 0}}>
                    {loading ?
                            (
                                <div
                                    style={{
                                        'width': '100%',
                                        'align-items': 'center',
                                        'display': 'flex',
                                        'justify-content': 'center'
                                    }}
                                >
                                    <CircularProgress
                                        color="#00BC87"
                                        style={{ color: "#00BC87!important" }}
                                    />
                                </div>
                            )
                            :
                            success ?
                            <Row className="dashboard-content">
                                {/*<div>*/}
                                <Col lg="8">
                                    <div className="overview">
                                        <div>
                                            <span className="overview-label">Overview</span>
                                        </div>
                                    </div>
                                    <div>
                                        <Row className="landing-footer user-dashboard-funds">
                                            <Col>
                                                <img src={footerImage} className="user-header-image"  alt="logo"/>
                                            </Col>
                                            <Col>
                                                <div className="landing-footer-content">
                                                    <span className="user-dashboard-content">
                                                         € {dashboardData.balance}
                                                    </span>
                                                    <Link to={`/userTransactions`}>
                                                        <button type="submit" className="edit-button"
                                                                style={{padding: '13px 27px', marginTop:"20px"}}
                                                        >
                                                            ADD FUNDS
                                                        </button>
                                                    </Link>
                                                </div>
                                            </Col>
                                            <Col className="landing-image-right">
                                                <img src={footerImage} className="user-header-image"  alt="logo"/>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col>
                                                <div className="dashboard-element">
                                             <span className="element-number">
                                                 € {dashboardData.amountSpent}
                                            </span>
                                                    <span className="element-label">
                                                Total Amount Spent
                                            </span>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="dashboard-element">
                                             <span className="element-number">
                                                {dashboardData.totalOrders}
                                            </span>
                                                    <span className="element-label">
                                                Total Orders
                                            </span>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="dashboard-element">
                                             <span className="element-number">
                                                 €{dashboardData.accountsPurchased}
                                            </span>
                                                    <span className="element-label">
                                                Total Accounts Purchased
                                            </span>
                                                </div>

                                            </Col>
                                            <Col>
                                                <div className="dashboard-element">
                                             <span className="element-number">
                                                {dashboardData.totalTickets}
                                            </span>
                                                    <span className="element-label">
                                                Total Tickets
                                            </span>
                                                </div>
                                            </Col>

                                        </Row>
                                    </div>
                                    <Row >
                                        <Col>
                                            <div className="progress-container">
                                                <Row>
                                                    <Col>
                                                        <span className="progress-label">Completed Orders</span>
                                                        <ProgressBar variant="success"
                                                                     now={ordersData.completedOfUsers === 0 ? 0 : (ordersData.completedOfUsers/ordersData.allOfUsers)*100}
                                                                     label={ordersData.completedOfUsers +" / " + ordersData.allOfUsers}/>
                                                    </Col>
                                                    <Col>
                                                        <span className="progress-label">Processing Orders</span>
                                                        <ProgressBar variant="success"
                                                                     now={ordersData.processingOfUsers === 0 ? 0 : (ordersData.processingOfUsers/ordersData.allOfUsers)*100}
                                                                     label={ordersData.processingOfUsers +" / " + ordersData.allOfUsers}/>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop:30}}>
                                                    <Col>
                                                        <span className="progress-label">Replacements</span>
                                                        <ProgressBar variant="success"
                                                                     now={ordersData.replacementsOfUsers === 0 ? 0 : (ordersData.replacementsOfUsers/ordersData.allOfUsers)*100}
                                                                     label={ordersData.replacementsOfUsers +" / " + ordersData.allOfUsers}/>
                                                    </Col>
                                                    <Col>
                                                        <span className="progress-label">Canceled Orders</span>
                                                        <ProgressBar variant="success"
                                                                     now={ordersData.canceledOfUsers === 0 ? 0 : (ordersData.canceledOfUsers/ordersData.allOfUsers)*100}
                                                                     label={ordersData.canceledOfUsers +" / " + ordersData.allOfUsers}/>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>

                                        <Col>
                                            <div className="progress-container">
                                                <Row>
                                                    <Col>
                                                        <span className="progress-label">Open Tickets</span>
                                                        <ProgressBar variant="success" now={(ticketsData.openedOfUsers/ticketsData.allTicketsOfUser)*100}
                                                                     label={ticketsData.openedOfUsers +" / " + ticketsData.allTicketsOfUser}/>
                                                    </Col>
                                                    <Col>
                                                        <span className="progress-label">Pending Tickets</span>
                                                        <ProgressBar variant="success" now={(ticketsData.pendingOfUsers/ticketsData.allTicketsOfUser)*100}
                                                                     label={ticketsData.pendingOfUsers +" / " + ticketsData.allTicketsOfUser}/>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop:30}}>
                                                    <Col>
                                                        <span className="progress-label">New Replies</span>
                                                        <ProgressBar variant="success" now={(ticketsData.newRepliesOfUsers/ticketsData.allTicketsOfUser)*100}
                                                                     label={ticketsData.newRepliesOfUsers +" / " + ticketsData.allTicketsOfUser}/>
                                                    </Col>
                                                    <Col>
                                                        <span className="progress-label">Closed Tickets</span>
                                                        <ProgressBar variant="success" now={(ticketsData.closedOfUsers/ticketsData.allTicketsOfUser)*100}
                                                                     label={ticketsData.closedOfUsers +" / " + ticketsData.allTicketsOfUser}/>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col>
                                            <div className="user-dashboard-footer">
                                                <span className="staff-members-header">Staff Online</span>
                                                <span className="staff-members">{dashboardData.staffOnline} Staff Members</span>
                                            </div>
                                        </Col>

                                        <Col>
                                            <div className="user-dashboard-footer">
                                                <span className="staff-members-header">Sign Up Date</span>
                                                <span className="staff-members" style={{marginBottom:"30px"}}>
                                                    {moment(dashboardData.signUpDate).format('DD MMM YYYY h:mm A')}</span>
                                                <span className="staff-members-header">Last Sign In</span>
                                                <span className="staff-members">
                                                    {moment(dashboardData.lastSignIn).format('DD MMM YYYY h:mm A')}
                                                  </span>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg="4">
                                     <UserAnnouncements/>
                                </Col>
                            </Row>
                                : null
                    }
                </div>

            </Col>
            <Snackbar open={error} autoHideDuration={4000} onClose={handleClose}>
                {error && (
                    <Alert onClose={handleClose} severity="error">
                        Error! Couldn't process request!
                    </Alert>
                )}
            </Snackbar>
        </div>


    )
}
export default UserDashboard;
