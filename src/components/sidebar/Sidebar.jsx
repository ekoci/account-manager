import React from "react";
import {Nav} from "react-bootstrap";
import './Sidebar.css'
import Photo from '../../assets/logo.png';
import {Link, useHistory} from 'react-router-dom';
import dashboard from '../../assets/dashboard.svg';
import dashboardWhite from '../../assets/dashboard-white.svg';
import product from '../../assets/products.svg';
import productWhite from '../../assets/products-white.svg';
import transaction from '../../assets/transaction.svg';
import transactionWhite from '../../assets/transaction-white.svg';
import orders from '../../assets/orders.svg';
import ordersWhite from '../../assets/orders-white.svg';
import tickets from '../../assets/tickets.svg';
import ticketsWhite from '../../assets/tickets-white.svg';
import users from '../../assets/users.svg';
import usersWhite from '../../assets/users-white.svg';
import settings from '../../assets/settings.svg';
import settingsWhite from '../../assets/settingsWhite.svg'
import {useLocation} from 'react-router-dom'

const Sidebar = props => {
    const location = useLocation();
    const history = useHistory();
    const currentLocation = location.pathname;
    const token = localStorage.getItem('token') || false;
    const role = JSON.parse(localStorage.getItem('user')) || '';
        console.log(role)
    const username = role ==='' ? '' :role.username.charAt(0);
       const logout = ()=>{
           localStorage.removeItem("token");
           localStorage.removeItem("user");
           history.push('/')
       }
    return (
        <>
            {
                token ?

                    <Nav className="flex-column"
                         activeKey="/home"
                         onSelect={selectedKey => alert(`selected ${selectedKey}`)}>
                        <div className={`logo ${currentLocation.includes('/dashboard') ? " border-sidebar-bottom" : ""}
                ${currentLocation.includes('/userdashboard') ? " border-sidebar-bottom" : ""}`}>
                            <Link to={role.role === 'admin'? '/dashboard': '/userdashboard'}>
                            <img src={Photo} className="logo-photo" alt="logo"/>
                            </Link>
                        </div>
                        <div className="sidebar-sticky"></div>

                        {role.role === 'admin' ?
                            <>
                                <Nav.Item
                                    className={`sidebar-item ${currentLocation.includes('/dashboard') ? " active-sidebar-item" : ""}
                    ${currentLocation.includes('/adminProduct') ? " border-sidebar-bottom" : ""}
                `}>
                                    <Link to='/dashboard'>
                                        {
                                            currentLocation.includes('/dashboard') ?
                                                <img id="dashboard" src={dashboard} className="sidebar-logo"/>
                                                :
                                                <img id="dashboard-white" src={dashboardWhite}
                                                     className="sidebar-logo"/>
                                        }
                                    </Link>
                                </Nav.Item>
                                <Nav.Item
                                    className={`sidebar-item  ${currentLocation.includes('adminProduct') ? " active-sidebar-item" : ""}
                 ${currentLocation.includes('dashboard') ? " border-sidebar-top" : ""}
                 ${currentLocation.includes('adminTransactions') ? " border-sidebar-bottom" : ""}
                 `}>
                                    <Link to='/adminProduct'>
                                        {
                                            currentLocation.includes('adminProduct') ?
                                                <img id="product" src={product} className="sidebar-logo"/>
                                                :
                                                <img id="product-white" src={productWhite} className="sidebar-logo"/>
                                        }
                                    </Link>
                                </Nav.Item>
                                <Nav.Item
                                    className={`sidebar-item  ${currentLocation.includes('adminTransactions') ? " active-sidebar-item" : ""}
                ${currentLocation.includes('adminProduct') ? " border-sidebar-top" : ""}
                  ${currentLocation.includes('adminOrders') ? " border-sidebar-bottom" : ""}
                `}>
                                    <Link to='/adminTransactions'>
                                        {
                                            currentLocation.includes('adminTransactions') ?
                                                <img id="transaction" src={transaction} className="sidebar-logo"/>
                                                :
                                                <img id="transaction-white" src={transactionWhite}
                                                     className="sidebar-logo"/>
                                        }
                                    </Link>
                                </Nav.Item>
                                <Nav.Item
                                    className={`sidebar-item  ${currentLocation.includes('adminOrders') ? " active-sidebar-item" : ""}
                  ${currentLocation.includes('adminTransactions') ? " border-sidebar-top" : ""}
                  ${currentLocation.includes("adminTickets") ? " border-sidebar-bottom" : ""}
                `}>
                                    <Link to='/adminOrders'>
                                        {
                                            currentLocation.includes('adminOrders') ?
                                                <img id="orders" src={orders} className="sidebar-logo"/>
                                                :
                                                <img id="orders-white" src={ordersWhite} className="sidebar-logo"/>
                                        }
                                    </Link>
                                </Nav.Item>
                                <Nav.Item
                                    className={`sidebar-item  ${currentLocation.includes('adminTickets') ? " active-sidebar-item" : ""}
                ${currentLocation.includes('adminUsers') ? " border-sidebar-bottom" : ""}
                ${currentLocation.includes('adminOrders') ? " border-sidebar-top" : ""}
                `}>
                                    <Link to='/adminTickets'>
                                        {
                                            currentLocation.includes('adminTickets') ?
                                                <img id="tickets" src={tickets} className="sidebar-logo"/>
                                                :
                                                <img id="tickets-white" src={ticketsWhite} className="sidebar-logo"/>
                                        }
                                    </Link>
                                </Nav.Item>
                                <Nav.Item
                                    className={`sidebar-item  ${currentLocation.includes('adminUsers') ? " active-sidebar-item" : ""}
                 ${currentLocation.includes('settings') ? " border-sidebar-bottom" : ""}
                 ${currentLocation.includes('adminTickets') ? " border-sidebar-top" : ""}
                `}>
                                    <Link to='/adminUsers'>
                                        {
                                            currentLocation.includes('adminUsers') ?
                                                <img id="users" src={users} className="sidebar-logo"/>
                                                :
                                                <img id="users-white" src={usersWhite} className="sidebar-logo"/>
                                        }
                                    </Link>
                                </Nav.Item>
                                <Nav.Item
                                    className={`sidebar-item  ${currentLocation.includes('/settings') ? " active-sidebar-item" : ""}
                 ${currentLocation.includes('adminUsers') ? " border-sidebar-top" : ""}
                `}>
                                    <Link to='/settings'>
                                        {
                                            currentLocation.includes('/settings') ?
                                                <img id="settings" src={settings} className="sidebar-logo"/>
                                                :
                                                <img id="settings-white" src={settingsWhite} className="sidebar-logo"/>
                                        }
                                    </Link>
                                </Nav.Item>

                            </>


                            :
                            <>
                                <Nav.Item
                                    className={`sidebar-item ${currentLocation.includes('/userdashboard') ? " active-sidebar-item" : ""}
                                    ${currentLocation.includes('/userProducts') ? " border-sidebar-bottom" : ""}
                                `}>
                                    <Link to='/userdashboard'>
                                        {
                                            currentLocation.includes('/userdashboard') ?
                                                <img id="dashboard" src={dashboard} className="sidebar-logo"/>
                                                :
                                                <img id="dashboard-white" src={dashboardWhite}
                                                     className="sidebar-logo"/>
                                        }
                                    </Link>
                                </Nav.Item>
                                <Nav.Item
                                    className={`sidebar-item  ${currentLocation.includes('userProducts') ? " active-sidebar-item" : ""}
                ${currentLocation.includes('userdashboard') ? " border-sidebar-top" : ""}
                  ${currentLocation.includes('userTransactions') ? " border-sidebar-bottom" : ""}
                `}>
                                    <Link to='/userProducts'>
                                        {
                                            currentLocation.includes('userProducts') ?
                                                <img id="product" src={product} className="sidebar-logo"/>
                                                :
                                                <img id="product-white" src={productWhite} className="sidebar-logo"/>
                                        }
                                    </Link>
                                </Nav.Item>
                                <Nav.Item
                                    className={`sidebar-item  ${currentLocation.includes('userTransactions') ? " active-sidebar-item" : ""}
                                ${currentLocation.includes('userProducts') ? " border-sidebar-top" : ""}
                                  ${currentLocation.includes('userTickets') ? " border-sidebar-bottom" : ""}
                                `}>
                                    <Link to='/userTransactions'>
                                        {
                                            currentLocation.includes('userTransactions') ?
                                                <img id="transaction" src={transaction} className="sidebar-logo"/>
                                                :
                                                <img id="transaction-white" src={transactionWhite}
                                                     className="sidebar-logo"/>
                                        }
                                    </Link>
                                </Nav.Item>

                                <Nav.Item
                                    className={`sidebar-item  ${currentLocation.includes('userTickets') ? " active-sidebar-item" : ""}
                ${currentLocation.includes('userTransactions') ? " border-sidebar-top" : ""}
                  ${currentLocation.includes('userOrders') ? " border-sidebar-bottom" : ""}
                `}>
                                    <Link to='/userTickets'>
                                        {
                                            currentLocation.includes('userTickets') ?
                                                <img id="transaction" src={tickets} className="sidebar-logo"/>
                                                :
                                                <img id="transaction-white" src={ticketsWhite}
                                                     className="sidebar-logo"/>
                                        }
                                    </Link>
                                </Nav.Item>
                                <Nav.Item
                                    className={`sidebar-item  ${currentLocation.includes('userOrders') ? " active-sidebar-item" : ""}
                  ${currentLocation.includes('userTickets') ? " border-sidebar-top" : ""}
                  ${currentLocation.includes("userSettings") ? " border-sidebar-bottom" : ""}
                `}>
                                    <Link to='/userOrders'>
                                        {
                                            currentLocation.includes('userOrders') ?
                                                <img id="orders" src={orders} className="sidebar-logo"/>
                                                :
                                                <img id="orders-white" src={ordersWhite} className="sidebar-logo"/>
                                        }
                                    </Link>
                                </Nav.Item>
                                <Nav.Item
                                    className={`sidebar-item  ${currentLocation.includes('/userSettings') ? " active-sidebar-item" : ""}
                 ${currentLocation.includes('userOrders') ? " border-sidebar-top" : ""}
                `}>
                                    <Link to='/userSettings'>
                                        {
                                            currentLocation.includes('/userSettings') ?
                                                <img id="settings" src={settings} className="sidebar-logo"/>
                                                :
                                                <img id="settings-white" src={settingsWhite} className="sidebar-logo"/>
                                        }
                                    </Link>
                                </Nav.Item>
                            </>
                        }
                        <div className={`sidebar-footer ${ (currentLocation.includes('userSettings') || currentLocation.includes('settings')) ? " border-sidebar-top" : ""}` }>
                            <div className='user-logout' onClick={()=>logout()}>
                                <span className='user-span'>
                                    {username}
                                </span>
                            </div>
                        </div>
                    </Nav>
                    : null

            }
        </>

    );
}
;

export default Sidebar
