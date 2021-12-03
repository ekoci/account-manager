import React, {useState, useEffect} from "react";
// import './AdminTransaction.css'
import {Container,Row,Col} from "react-bootstrap";
import {Icon} from 'semantic-ui-react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import apiGtw from "../../api";
import UserDetails from "../../components/userDetails/UserDetail";
import AddFounds from "../../components/addFounds/AddFounds";
import CustomPrice from "../../components/customPrice/CustomPrice";
import EditUser from "../../components/editUser/EditUser";
import {CircularProgress, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
async function fetchTransactData(id) {
    const result = await apiGtw.get(
        'spotify/user/getById?userId='+id,
    );
    return result.data;
}
async function fetchUserDetailsData(id) {
    const result = await apiGtw.get(
        'spotify/user/userDetails?userId='+id,
    );
    return result.data;
}
const AdminUser = (props)=>{

    const [userData, setData] = useState({});
    const [userDetailsData, setUserDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await fetchTransactData(props.match.params.userId);
            const userDetails = await fetchUserDetailsData(props.match.params.userId);
            setData(data);
            setUserDetails(userDetails);
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
    // console.log('enxhi', transactionDetails)
    return(
        <>

            <div className="admin-transaction">
                <Row className="page-back-transaction">
                    <Link to={`/adminUsers`}>
                        <Icon name='angle left' />
                        <span>Users </span>
                    </Link>
                </Row>
                <Row>
                    <span className="transaction-name">User {props.match.params.userId} </span>
                </Row>
                <Row>
                    <Col className="transaction-label-column" md={8}>
                        {loading ?
                            (
                                <div style={{
                                    'width': '100%',
                                    'alignItems': 'center',
                                    'display': 'flex',
                                    'justifyContent': 'center'
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
                        <Col style={{paddingLeft:'0px'}}>
                            <span className="transaction-label">User Details</span>
                            <UserDetails userDetailsData={userDetailsData}></UserDetails>
                        </Col>
                        <Col style={{paddingLeft:'0px', marginTop:'70px'}}>
                            <span className="transaction-label">Edit User</span>
                            <EditUser user={userData}/>
                        </Col>
                        </> :null
                        }
                    </Col>
                    <Col className="transaction-label-column" md={4}>
                        <Col>
                            <span className="transaction-label">Add Funds</span>
                            <AddFounds user={userData}/>
                        </Col>

                        <Col style={{marginTop:'70px'}}>
                            <span className="transaction-label">Custom Price</span>
                            <CustomPrice user={userData}/>

                        </Col>
                    </Col>

                </Row>
            </div>
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

export default AdminUser;