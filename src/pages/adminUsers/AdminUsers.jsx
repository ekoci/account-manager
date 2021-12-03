import React, { useState, useEffect,useReducer } from 'react';
// import '../adminProducts/AdminProducts.css'
import {Container, Row, Button, Nav} from "react-bootstrap";
import apiGtw from '../../api';
import Table from "../../components/table/Table";
// import './AdminTransactions.css';
import {formatDate} from "../../Helpers"
import {
    DataGrid,
    ColDef,
    ValueGetterParams,
    CellParams,
    GridApi
} from "@material-ui/data-grid";
import {Link} from "react-router-dom";
import {Icon} from "semantic-ui-react";
import {CircularProgress, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
async function fetchTransactData() {
    const result = await apiGtw.get(
        'spotify/user/getAll',
    );
    return result.data;
}
const AdminUsers = ()=>{

    const [userData, setData] = useState({ hits: [] });

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'username', headerName: 'Username', width: 130 },
        { field: 'email', headerName: 'E-Mail', width: 130 },
        { field: 'balance', headerName: 'Balance', width: 170 },
        { field: 'userStatus', headerName: 'Status', width: 170 },
        { field: 'signUpDate', headerName: 'Sign Up Date', width: 170 ,   valueFormatter: ({ value }) => formatDate(value),},
        { field: 'lastSignIn', headerName: 'Last Sign In', width: 170 ,   valueFormatter: ({ value }) => formatDate(value),},
        {
            field: "",
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = () => {
                    console.log('enxhi',params.getValue('id'));

                    // return alert(JSON.stringify(thisRow, null, 4));
                };
                return   <Link to={`/adminUsers/adminUser${params.getValue('id')}`}>
                    <button className="table-button" onClick={onClick}>
                                        <span>
                                            View
                                        </span>
                    </button>
                </Link>;
            },
            width: 170
        }
    ];

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [allUsers, setAllUsers] = useState({ hits: [] });
    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await fetchTransactData();
            console.log(data)
            setData(data);
            setAllUsers(data);
            // switch loading to false after fetch is complete
            setSuccess(true);
        } catch (error) {
            // add error handling here
            setError(true);
            console.log(error);
        }
        setLoading(false);
    }, []);
    function filterByValue(array, value) {
        const reg = new RegExp(value,'i');
        return array.filter((item)=>{
            let flag;
            for(let prop in item){
                if(reg.test(item[prop])  &&
                    (prop==="email" || prop ==='username' || prop ==='userStatus'  || prop ==='balance'
                        || prop === "signUpDate"|| prop === "lastSignIn")){
                    flag =  item[prop]
                }
            };
            return flag;
        });
    }

    const handleClose = () => {
        setSuccess(false);
        setError(false);
    };
    const search = async (value)=>{
        if(value === ''){
            console.log(allUsers)
            setData(allUsers);
            // switch loading to false after fetch is complete
        }else{
            const filter =filterByValue(allUsers, value)
            console.log(filter)
            setData(filter);
        }
    }
    return(
        <>
            <div className="admin-transaction">

                <Row style={{marginLeft:'-100px'}}>
                    <div style={{position:'relative'}}>
                        <Icon name='search' className="global-search-icon"/>
                        <input className="global-search" placeholder="Search"
                               onChange={(e) => search(e.target.value)}></input>
                    </div>
                </Row>
                <Row>
                    <span className="admin-transaction-tittle">
                        Users
                    </span>
                </Row>
                <Row>
                    <span className="admin-transaction-label">
                        All users
                    </span>
                </Row>
                <Row>
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
                        <Table tableData={userData} type={"transaction"} event={'test'}
                               header={columns}/>
                               :null
                    }
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

export default AdminUsers;