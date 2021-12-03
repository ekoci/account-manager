import React, { useState, useEffect} from 'react';
import {Row,  Col} from "react-bootstrap";
import apiGtw from '../../api';
import Table from "../../components/table/Table";
import {formatDate} from "../../Helpers";
import "./UserTicket.css"
import {Link} from "react-router-dom";
import {Icon} from "semantic-ui-react";
import {CircularProgress, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
async function fetchTransactData(id) {
    const result = await apiGtw.get(
        '/spotify/ticket/getAllOfUserDto?userId='+id,
    );
    return result.data;
}
const UserTickets = ()=>{

    const [transactData, setData] = useState({ hits: [] });
    const [allTicket, setAllTicket] = useState({ hits: [] });

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Tittle', width: 300 },
        { field: 'amount', headerName: 'Creation Date', width:  170 ,   valueFormatter: ({ value }) => formatDate(value),},
        { field: 'createdAt', headerName: 'Last Update', width: 170 ,   valueFormatter: ({ value }) => formatDate(value),},
        { field: 'ticketStatus', headerName: 'Status', width: 170 },
        {
            field: "",
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = () => {
                };
                return   <Link to={`/userTickets/userTicket${params.getValue('id')}`}>
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
            const data = await fetchTransactData(localStorage.getItem('token'));
            console.log(data)
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
                    (prop==="title" || prop ==='amount' || prop === "createdAt")){
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
                <Row style={{marginLeft:'-30px'}}>
                    <div style={{position:'relative'}}>
                        <Icon name='search' className="global-search-icon"/>
                        <input className="global-search" placeholder="Search" required={true}
                               onChange={(e) => search(e.target.value)}></input>
                    </div>
                </Row>
                <Row style={{marginLeft:'-30px'}}>
                    <span className="admin-transaction-tittle">
                        Tickets
                    </span>
                </Row>
                <Row>
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
                        <>
                            <Col className="transaction-label-column" md={8}>
                                <Row>
                                    <span className="transaction-label" style={{marginBottom:"30px"}}>Ticket History</span>
                                    <Table tableData={transactData} type={"transaction"} event={'test'}
                                           header={columns}/>
                                </Row>
                            </Col>
                            <Col className="transaction-label-column" md={4} style={{paddingLeft:"30px"}}>
                                <span className="transaction-label">New Ticket</span>
                             <div className="user-new-ticket">
                                 <span className="user-new-ticket-header">
                                    New Ticket
                                 </span>
                                 <Link to='/userTickets/userNewTicket'>
                                     <button type="submit" style={{padding: '13px 27px'}}
                                             className="edit-button">NEW TICKET</button>
                                 </Link>

                                 <span className="user-new-ticket-label">
                                    A team of experienced professionals is always at your service to help you with any issues or questions.
                                 </span>
                             </div>
                            </Col>
                        </>
                            :
                            null
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

export default UserTickets;
