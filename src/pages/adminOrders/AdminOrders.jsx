import React, { useState, useEffect,useReducer } from 'react';
import '../adminProducts/AdminProducts.css'
import {Container,Row,Button} from "react-bootstrap";
import apiGtw from '../../api';
import Table from "../../components/table/Table";
import {formatDate} from "../../Helpers"
import {Link} from "react-router-dom";
import {Icon} from "semantic-ui-react";
import {CircularProgress, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
async function fetchTransactData() {
    const result = await apiGtw.get(
        'spotify/order/getAllDto',
    );
    return result.data;
}
const AdminOrders = ()=>{

    const [ordersData, setData] = useState({ hits: [] });

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'userName', headerName: 'Username', width: 170 },
        { field: 'userEmail', headerName: 'E-Mail', width: 170 },
        { field: 'productName', headerName: 'Product', width: 170 },
        { field: 'orderStatus', headerName: 'Status', width: 170 },
        { field: 'value', headerName: 'Value', width: 170 , renderCell: (params) => {
                return <>€{params.getValue('value')}</>
            },},
        { field: 'orderDate', headerName: 'Order Date', width: 130,valueFormatter: ({ value }) => formatDate(value), },
        {
            field: "",
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = () => {

                    // return alert(JSON.stringify(thisRow, null, 4));
                };
                return <Link to={`/adminOrders/adminOrder${params.getValue('id')}`}>
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

    const [allOrders, setOrders] = useState({ hits: [] });
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await fetchTransactData();
            setData(data);
            setOrders(data);
            // switch loading to false after fetch is complete
            setSuccess(true);
        } catch (error) {
            // add error handling here
            setError(true);
            console.log(error);
        }
        setLoading(false);
    }, []);

    const search = async (value)=>{
        if(value === ''){
            setData(allOrders);
            // switch loading to false after fetch is complete
        }else{
            const filter =filterByValue(allOrders, value)
            setData(filter);
        }
    }
    function filterByValue(array, value) {
        const reg = new RegExp(value,'i');
        return array.filter((item)=>{
            let flag;
            for(let prop in item){
                if(reg.test(item[prop])  &&
                    (prop==="userName" || prop ==='userEmail' || prop === "productName"
                        || prop === "orderStatus"
                        || prop === "value"
                        || prop === "orderDate")){
                    flag =  item[prop];
                }
            };
            return flag;
        });
    }

    const handleClose = () => {
        setSuccess(false);
        setError(false);
    };
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
                        Orders
                    </span>
                </Row>
                <Row>
                    <span className="admin-transaction-label">
                        All Orders
                    </span>
                </Row>
                <Row>
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
                        <Table tableData={ordersData} type={"transaction"} event={'test'}
                               header={columns}/>
                               : null
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

export default AdminOrders;