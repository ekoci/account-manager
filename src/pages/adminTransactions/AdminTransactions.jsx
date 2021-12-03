import React, { useState, useEffect } from 'react';
import '../adminProducts/AdminProducts.css'
import {Row} from "react-bootstrap";
import apiGtw from '../../api';
import Table from "../../components/table/Table";
import './AdminTransactions.css';
import {formatDate} from "../../Helpers"
import {Link} from "react-router-dom";
import {Icon} from "semantic-ui-react";
import {CircularProgress, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
async function fetchTransactData() {
    const result = await apiGtw.get(
        'spotify/transaction/getTransactionUser',
    );
    return result.data;
}
const statusOptions = [
    { key: 'pending', value: 'pending', text: 'Pending' },
    { key: 'active', value: 'active', text: 'Active' },
    { key: 'closed', value: 'closed', text: 'Closed' },

]
const AdminTransactions = ()=>{

    const [transactData, setData] = useState({ hits: [] });
    const [allTransact, setTransact] = useState({ hits: [] });
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'usersUsername', headerName: 'Username', width: 130 },
        { field: 'usersEmail', headerName: 'E-Mail', width: 170 },
        { field: 'paymentMethod', headerName: 'Payment Method', width: 170 },
        { field: 'amount', headerName: 'Amount', width: 100 },
        { field: 'transactionStatus', headerName: 'Status', width: 170 },
        { field: 'createdAt', headerName: 'Creation Date', width: 170 ,   valueFormatter: ({ value }) => formatDate(value),},
        {
            field: "",
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = () => {
                    // return alert(JSON.stringify(thisRow, null, 4));
                };
                return   <Link to={`/adminTransactions/adminTransaction${params.getValue('id')}`}>
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

    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await fetchTransactData();
            setData(data);
            setTransact(data);
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
    };
    const search = async (value)=>{
        if(value === ''){
            setData(allTransact);
            // switch loading to false after fetch is complete
        }else{
            const filter =filterByValue(allTransact, value)
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
                    (prop==="usersUsername" || prop ==='usersEmail' || prop === "paymentMethod"
                        || prop === "amount"
                        || prop === "transactionStatus"
                        || prop === "createdAt")){
                    flag =  item[prop];
                }
            };
            return flag;
        });
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
                        Transactions
                    </span>
                </Row>
                <Row>
                    <span className="admin-transaction-label">
                        All Transactions
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
                        <Table tableData={transactData} type={"transaction"} event={'test'}
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

export default AdminTransactions;