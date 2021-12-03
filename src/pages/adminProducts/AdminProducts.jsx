import React, { useState, useEffect,useReducer } from 'react';
import './AdminProducts.css'
import {Container, Row, Button, Nav} from "react-bootstrap";
import apiGtw from '../../api';
import Table from "../../components/table/Table";
import {Link} from "react-router-dom";
import {formatDate} from "../../Helpers"
import {Icon} from "semantic-ui-react";
import {CircularProgress, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
async function fetchData() {
    const result = await apiGtw.get(
        'spotify/product/allProductsAndAccounts',
    );
    return result.data;
}

const AdminProducts = ()=>{
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 130 },
        { field: 'nrOfAccounts', headerName: 'Accounts', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'status', headerName: 'Status', width: 130 },
        {
            field: 'test',
            headerName: 'Minimum / Maximum',
            valueGetter: (params) =>
                `${params.getValue('minimum') || ''} / ${params.getValue('maximum') || ''}`,
            width: 180
        },
        { field: 'deliveryTime', headerName: 'Creation Date', width: 180,
            valueFormatter: ({ value }) => formatDate(value),},
        {
            field: "",
            disableClickEventBubbling: true,
            renderCell: () => {
                return <button className="table-button">
                            <span>
                                View
                            </span>
                        </button>;
            },
            width: 130
        }
    ];
    const [productData, setData] = useState({ hits: [] });
    const [loading, setLoading] = useState(false);
    const [allProduct, setProduct] = useState({ hits: [] });
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await fetchData();
            setData(data);
            setProduct(data);
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
            console.log(allProduct)
            setData(allProduct);
            // switch loading to false after fetch is complete
        }else{
            const filter =filterByValue(allProduct, value)
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
                    (prop==="title" || prop ==='nrOfAccounts' || prop === "createdAt"
                        || prop === "price"
                        || prop === "status"
                        || prop === "deliveryTime")){
                    flag =  item[prop];
                }
            };
            return flag;
        });
    }
    return(
        <>
            <div className="admin-products admin-container">
                <Row style={{marginLeft:'-100px'}}>
                    <div style={{position:'relative'}}>
                        <Icon name='search' className="global-search-icon"/>
                        <input className="global-search" placeholder="Search"
                               onChange={(e) => search(e.target.value)}></input>
                    </div>
                </Row>
                <Row>
                    <span className="admin-products-title">
                        Products
                    </span>
                </Row>
                <Row>
                    <span className="admin-products-label">
                        All Products
                    </span>
                </Row>
                <Row className="button-container">
                        <Button className="admin-products-button">Products</Button>
                    <Link to='/adminProduct/adminAddPrduct'>
                        <Button className="admin-products-button add-product">
                            <strong>Add Product</strong>
                        </Button>
                    </Link>
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
                        <Table tableData={productData} type={"product"} event={'test'}
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

export default AdminProducts;
