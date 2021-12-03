import React, { useState, useEffect,useReducer } from 'react';
import {Container,Row,Button} from "react-bootstrap";
import apiGtw from '../../api';
import Table from "../../components/table/Table";
import {Link} from "react-router-dom";
import {formatDate} from "../../Helpers"
import {Icon} from "semantic-ui-react";
import {CircularProgress, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
async function fetchTransactData() {
    const result = await apiGtw.get(
        'spotify/ticket/ticketUserDto',
    );
    return result.data;
}
const AdminTickets = () =>{

    const [ticketData, setData] = useState({ hits: [] });
    const [allTicket, setAllTicket] = useState({ hits: [] });
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 200},
        { field: 'userName', headerName: 'Username', width: 170},
        { field: 'createdAt', headerName: 'Creation Date',valueFormatter: ({ value }) => formatDate(value), width: 180 },
        { field: 'updatedAt', headerName: 'Last Update',valueFormatter: ({ value }) => formatDate(value), width: 180 },
        { field: 'status', headerName: 'Status', width: 170},
        {
            field: "",
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return <Link to={`/adminTickets/adminTicketChat${params.getValue('id')}`}>
                    <button className="table-button">
                                        <span>
                                            View
                                        </span>
                    </button>
                </Link>;
            },
            width: 130
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
            setAllTicket(data);
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
    function filterByValue(array, value) {
        const reg = new RegExp(value,'i');
        return array.filter((item)=>{
            let flag;
            for(let prop in item){
                if(reg.test(item[prop])  &&
                    (prop==="title" || prop ==='userName' || prop ==='status'  || prop ==='amount' || prop === "createdAt")){
                    flag =  item[prop]
                }
            };
            return flag;
        });
    }

    const search = async (value)=>{
        if(value === ''){
            setData(allTicket);
            // switch loading to false after fetch is complete
        }else{
            const filter =filterByValue(allTicket, value)
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
                        Tickets
                    </span>
                </Row>

                <Row>
                    <span className="admin-transaction-label">
                        All Tickets
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
                        <Table tableData={ticketData} type={"ticket"} event={'test'}
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

export default AdminTickets;