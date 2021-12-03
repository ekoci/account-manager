import React, {useEffect, useState} from 'react';
import "./AdminDashboard.css"
import {Container, Row, Col, Dropdown, ProgressBar} from "react-bootstrap";
import AddAnnouncement from "../../components/addAnnouncement/addAnnouncement";
import Announcements from "../../components/announcements/announcements";
import ProgressBarComponent from "../../components/progressBar/progressBar";
import apiGtw from "../../api";
async function fetchTransactData() {
    const result = await apiGtw.get(
        'spotify/dashboard/getAll',
    );
    return result.data;
};
async function fetchOrdersInDash() {
    const result = await apiGtw.get(
        'spotify/dashboard/getOrdersInDash',
    );
    return result.data;
}
async function fetchTicketsInDash() {
    const result = await apiGtw.get(
        'spotify/dashboard/getTicketsInDash',
    );
    return result.data;
}
const AdminDashboard = () => {


    const [dashboardData, setData] = useState({});
    const [ordersData, setOrders] = useState({});
    const [ticketsData, setTickets] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await fetchTransactData();
            console.log(data)
            setData(data);
            const orders= await fetchOrdersInDash();
            console.log(orders)
            setOrders(orders);
            const tickets= await fetchTicketsInDash();
            setTickets(tickets);
            // switch loading to false after fetch is complete
            setLoading(false);
        } catch (error) {
            // add error handling here
            setLoading(false);
            console.log(error);
        }
    }, []);
    return (
        <>
        <div className='homepage'>
            <Col style={{paddingTop: 48}}>
                <span className="dashboard-title">Dashboard</span>
                <div style={{paddingLeft: 0}}>
                    {
                        loading ? "loading"
                            :


                    <Row className="dashboard-content">
                        {/*<div>*/}
                        <Col lg="8">
                            <div className="overview">
                                <div>
                                    <span className="overview-label">Overview</span>
                                </div>
                            </div>
                            <div>
                                <Row>
                                    <Col>
                                        <div className="dashboard-element">
                                            <span className="element-number">
                                                €{dashboardData.revenue}
                                            </span>
                                            <span className="element-label">
                                                Revenue
                                            </span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="dashboard-element">
                                          <span className="element-number">
                                                {dashboardData.nrOfOrders}
                                            </span>
                                            <span className="element-label">
                                                Orders
                                            </span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="dashboard-element">
                                             <span className="element-number">
                                                 {dashboardData.nrOfTickets}
                                            </span>
                                            <span className="element-label">
                                                Tickets
                                            </span>
                                        </div>

                                    </Col>
                                    <Col>
                                        <div className="dashboard-element">
                                             <span className="element-number">
                                               {dashboardData.nrOfProducts}
                                            </span>
                                            <span className="element-label">
                                                Products
                                            </span>
                                        </div>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <div className="dashboard-element">
                                             <span className="element-number">
                                                 {dashboardData.nrOfUsers}
                                            </span>
                                            <span className="element-label">
                                                Users
                                            </span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="dashboard-element">
                                             <span className="element-number">
                                                {dashboardData.nrOfClients}
                                            </span>
                                            <span className="element-label">
                                                Clients
                                            </span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="dashboard-element">
                                             <span className="element-number">
                                                 €{dashboardData.clientBalance}
                                            </span>
                                            <span className="element-label">
                                                Client's Balance
                                            </span>
                                        </div>

                                    </Col>
                                    <Col>
                                        <div className="dashboard-element">
                                             <span className="element-number">
                                                €{parseFloat(dashboardData.conversionRate).toFixed(2)}
                                            </span>
                                            <span className="element-label">
                                                Conversion Rate
                                            </span>
                                        </div>
                                    </Col>

                                </Row>
                            </div>
                            <div style={{marginTop: 60, display: 'flex'}}>
                                <Col>
                                    <span className="overview-label">Order</span>
                                    <div className="progress-container">
                                        <Row>
                                            <Col>
                                                <span className="progress-label">Completed Orders</span>
                                                <ProgressBar variant="success"
                                                             now={(ordersData.completedOrders/ordersData.allOrders)*100}
                                                             label={ordersData.completedOrders +" / " + ordersData.allOrders}/>
                                            </Col>
                                            <Col>
                                                <span className="progress-label">Processing Orders</span>
                                                {ordersData.processingOfUsers/ordersData.allOfUsers}
                                                <ProgressBar variant="success"
                                                             now={(ordersData.processingOrders/ordersData.allOrders)*100}
                                                             label={ordersData.processingOrders +" / " + ordersData.allOrders}/>
                                            </Col>
                                        </Row>
                                        <Row style={{marginTop:30}}>
                                            <Col>
                                                <span className="progress-label">Replacements</span>
                                                <ProgressBar variant="success" now={(ordersData.replacements/ordersData.allOrders)*100}
                                                             label={ordersData.replacements +" / " + ordersData.allOrders}/>
                                            </Col>
                                            <Col>
                                                <span className="progress-label">Canceled Orders</span>
                                                <ProgressBar variant="success" now={(ordersData.canceledOrders/ordersData.allOrders)*100}
                                                             label={ordersData.canceledOrders +" / " + ordersData.allOrders}/>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                                <Col>
                                    <span className="overview-label">Tickets</span>
                                    <div className="progress-container">
                                        <Row>
                                            <Col>
                                                <span className="progress-label">Open Tickets</span>
                                                <ProgressBar variant="success" now={(ticketsData.openedTickets/ticketsData.allTickets)*100}
                                                             label={ticketsData.openedTickets +" / " + ticketsData.allTickets}/>
                                            </Col>
                                            <Col>
                                                <span className="progress-label">Pending Tickets</span>
                                                <ProgressBar variant="success" now={(ticketsData.pendingTickets/ticketsData.allTickets)*100}
                                                             label={ticketsData.pendingTickets +" / " + ticketsData.allTickets}/>
                                            </Col>
                                        </Row>
                                        <Row style={{marginTop:30}}>
                                            <Col>
                                                <span className="progress-label">New Replies</span>
                                                <ProgressBar variant="success" now={(ticketsData.newReplies/ticketsData.allTickets)*100}
                                                             label={ticketsData.newReplies +" / " + ticketsData.allTickets}/>
                                            </Col>
                                            <Col>
                                                <span className="progress-label">Closed Tickets</span>
                                                <ProgressBar variant="success" now={(ticketsData.closedTickets/ticketsData.allTickets)*100}
                                                             label={ticketsData.closedTickets +" / " + ticketsData.allTickets}/>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </div>
                        </Col>

                        <Col lg="4">
                            <div>
                                <AddAnnouncement/>
                            </div>
                            <div style={{marginTop: 60}}>
                                <Announcements/>
                            </div>
                        </Col>
                    </Row>
                    }
                </div>

            </Col>


        </div>
        </>

    )
}
export default AdminDashboard;
