import React, { useState, useEffect} from 'react';
import {Row, Col} from "react-bootstrap";
import apiGtw from '../../api';
import Table from "../../components/table/Table";
import {formatDate} from "../../Helpers";
import {Link} from "react-router-dom";
import {Icon} from "semantic-ui-react";
import {CircularProgress, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
async function fetchTransactData(id) {
    const result = await apiGtw.get(
        '/spotify/order/getAllOfUser?uuid='+id,
    );
    return result.data;
}
const UserOrders = ()=>{

    const [transactData, setData] = useState({ hits: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorDownload, setDownloadError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [allUserOrders, setUserOrders] = useState({ hits: [] });
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'productName', headerName: 'Product', width: 170 },
        { field: 'orderStatus', headerName: 'Status', width: 170 },
        { field: 'value', headerName: 'Value', width: 170 },
        { field: 'orderDate', headerName: 'Order Date', width: 170 ,   valueFormatter: ({ value }) => formatDate(value),},
        {
            field: "",
            disableClickEventBubbling: true,
            renderCell: (params) => {

                return  <button className="table-button" style={{width:"auto", padding:"12px"}}
                                onClick={()=>downloadAccounts(params.getValue('id'))}>
                                        <span>
                                            Download Accounts
                                        </span>
                    </button>;
            },
            width: 170
        }
    ];
    const downloadAccounts = async (id) => {
        try{
            setLoading(true);
            const result = await apiGtw.get(
                '/spotify/order/downloadOrderAccounts?orderId='+id,
            );
            console.log(result);
            const element = document.createElement("a");
            const file = new Blob([result.data], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = "accounts.txt";
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
            // setSuccess(true);
        }catch (e){
            console.log(e);
            setDownloadError(true)
        }
        setLoading(false);
    };

    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await fetchTransactData(localStorage.getItem('token'));
            setData(data);
            setUserOrders(data);
            console.log(data)
            // switch loading to false after fetch is complete
            setSuccess(true);
        } catch (error) {
            // add error handling here
            setError(true);
            console.log(error);
        }
        setLoading(false);
    }, []);
    const handleClose = () => {
        setSuccess(false);
        setError(false);
        setDownloadError(false);
    };
    const search = async (value)=>{
        if(value === ''){
            setData(allUserOrders);
            // switch loading to false after fetch is complete
        }else{
            const filter =filterByValue(allUserOrders, value)
            console.log(filter)
            setData(filter);
        }
    }
    function filterByValue(array, value) {
        const reg = new RegExp(value,'i');
        return array.filter((item)=>{
            let flag;
            for(let prop in item){
                if(reg.test(item[prop])  &&
                    (prop==="productName" || prop ==='orderStatus' || prop === "value"
                        || prop === "amount")){
                    flag =  item[prop];
                }
            };
            return flag;
        });
    }
    return(
        <>
            <div className="admin-transaction">
                <Row style={{marginLeft:'-30px'}}>
                    <div style={{position:'relative'}}>
                        <Icon name='search' className="global-search-icon"/>
                        <input className="global-search" placeholder="Search"
                               onChange={(e) => search(e.target.value)}></input>
                    </div>
                </Row>
                <Row style={{marginLeft:'-30px'}}>
                    <span className="admin-transaction-tittle">
                        Orders
                    </span>
                </Row>
                <Row>
                    {loading ?
                        (
                            <div
                                style={{
                                    'width': '100%',
                                    'alignItems': 'center',
                                    'display': 'flex',
                                    'justify-content': 'center'
                                }}
                            >
                                <CircularProgress
                                    style={{ color: "#00BC87!important" }}
                                />
                            </div>
                        )
                        :
                        // success ?
                        <>
                            <Col className="transaction-label-column" md={8}>
                                <Row>
                                    <span className="transaction-label" style={{marginBottom:"30px"}}>All Orders</span>
                                    <Table tableData={transactData} type={"transaction"} event={'test'}
                                           header={columns}/>
                                </Row>
                            </Col>
                            <Col className="transaction-label-column" md={4} style={{paddingLeft:"30px"}}>
                                <span className="transaction-label">New Ticket</span>
                                <div className="user-new-ticket">
                                 <span className="user-new-ticket-header">
                                    New Order
                                 </span>
                                    <Link to='/userProducts'>
                                        <button type="submit" style={{padding: '13px 27px',width: '100%'}}
                                                className="edit-button">New Order</button>
                                    </Link>

                                    <span className="user-new-ticket-label">
                                    You can easily make a purchase within seconds and receive your order instantly.
                                 </span>
                                </div>
                            </Col>
                        </>
                            // : null
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
            <Snackbar open={errorDownload} autoHideDuration={4000} onClose={handleClose}>
                {errorDownload && (
                    <Alert onClose={handleClose} severity="error">
                        Error! Couldn't process request!
                    </Alert>
                )}
            </Snackbar>
        </>

    );
}

export default UserOrders;