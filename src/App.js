import React from "react";
import './App.css';
import { AuthProvider } from './auth/Auth';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import AdminDashboard from "./pages/adminDashboard/AdminDashborad";
import AdminProducts from "./pages/adminProducts/AdminProducts";
import AdminAddProducts from "./pages/adminAddProduct/AdminAddProduct";
import AdminTransaction from "./pages/adminTransaction/AdminTransaction";
import AdminOrder from "./pages/adminOrder/AdminOrder";
import Sidebar from "./components/sidebar/Sidebar";
import {Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminTicketChat from './pages/adminTicketChat/AdminTicketChat.jsx';
import AdminTransactions from "./pages/adminTransactions/AdminTransactions";
import AdminOrders from "./pages/adminOrders/AdminOrders";
import AdminTickets from './pages/adminTickets/AdminTickets'
import AdminUsers from './pages/adminUsers/AdminUsers'
import AdminUser from './pages/adminUser/AdminUser'
import LandingPage from './pages/landingPage/LandingPage'
import Signup from "./components/sign-in/SignIn";
import UserDashboard from "./pages/userDashboard/UserDashboard"
import UserTransactions from "./pages/userTransactions/UserTransactions";
import UserTickets from "./pages/userTickets/UserTickets";
import UserNewTickets from "./pages/userNewTicket/UserNewTicket";
import UserTicket from "./pages/userTicket/UserTicket";
import UserSettings from "./pages/userSettings/UserSettings";
import UserPaypal from "./pages/userPaypal/UserPaypal"
import UserProducts from "./pages/userProducts/UserProducts";
import UserOrders from "./pages/userOrders/UserOrders";
import NewOrder from "./pages/newOrder/NewOrder";
import AdminSettings from "./pages/adminSettings/AdminSettings";
import UserManualPayments from "./pages/userManualPayment/UserManualPayment";
import Register from './components/Register/Register';
import Login from './components/Login/Login';

function App() {
  return (
      <AuthProvider>

                <Router>
                    <div className="App">
                        <div className="d-flex" id="wrapper" style={{minHeight:"100vh"}}>
                            <Sidebar />
                            <Switch>

                            {/*<PrivateRoute route="/test" exact component={Test}></PrivateRoute>*/}
                            <Route component={LandingPage} path="/" exact></Route>
                            <Route component={Register} path="/register" exact></Route>
                            <Route component={Login} path="/login" exact></Route>
                            <PrivateRoute component={AdminDashboard} path="/dashboard" exact></PrivateRoute>
                            <PrivateRoute component={AdminProducts} path="/adminProduct" exact></PrivateRoute>
                            <PrivateRoute component={AdminAddProducts} path="/adminProduct/adminAddPrduct" exact></PrivateRoute>
                            <PrivateRoute component={AdminTransactions} path="/adminTransactions" exact></PrivateRoute>
                            <PrivateRoute component={AdminTransaction} path="/adminTransactions/adminTransaction:id" exact></PrivateRoute>
                            <PrivateRoute component={AdminOrders} path="/adminOrders" exact></PrivateRoute>
                            <PrivateRoute component={AdminOrder} path="/adminOrders/adminOrder:id" exact></PrivateRoute>
                            <PrivateRoute component={AdminTickets} path="/adminTickets" exact></PrivateRoute>
                            <PrivateRoute component={AdminTicketChat} path="/adminTickets/adminTicketChat:id" exact></PrivateRoute>
                            <PrivateRoute component={AdminUsers} path="/adminUsers" exact></PrivateRoute>
                            <PrivateRoute component={AdminUser} path="/adminUsers/adminUser:userId" exact></PrivateRoute>
                            <PrivateRoute component={AdminSettings} path="/settings" exact></PrivateRoute>


                            <PrivateRoute component={UserDashboard} path="/userdashboard" exact></PrivateRoute>
                            <PrivateRoute component={UserProducts} path="/userProducts" exact></PrivateRoute>
                            <PrivateRoute component={NewOrder} path="/userProducts/newOrder:id" exact></PrivateRoute>
                            <PrivateRoute component={UserTransactions} path="/userTransactions" exact></PrivateRoute>
                            <PrivateRoute component={UserTickets} path="/userTickets" exact></PrivateRoute>
                            <PrivateRoute component={UserTicket} path="/userTickets/userTicket:id" exact></PrivateRoute>
                            <PrivateRoute component={UserOrders} path="/userOrders" exact></PrivateRoute>
                            <PrivateRoute component={UserNewTickets} path="/userTickets/userNewTicket" exact></PrivateRoute>
                            <PrivateRoute component={UserSettings} path="/userSettings" exact></PrivateRoute>
                            <PrivateRoute component={UserPaypal} path="/userTransactions/userPaypal:amount" exact></PrivateRoute>
                            <PrivateRoute component={UserManualPayments} path="/userTransactions/userManualPayments" exact></PrivateRoute>
                                <div id="page-content-wrapper">
                            </div>
                            </Switch>
                        </div>
                    </div>
                </Router>


      </AuthProvider>
  );
}

export default App;
