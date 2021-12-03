import React, { useState, useEffect,useReducer } from 'react';
import {Container, Row, Col} from "react-bootstrap";
import apiGtw from '../../api';
import "./UserProducts.css"
import {Link} from "react-router-dom";
import {Icon} from "semantic-ui-react";
import {CircularProgress, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
async function fetchData() {
    const result = await apiGtw.get(
        'spotify/product/allProductsAndAccounts',
    );
    return result.data;
}

const UserProducts = ()=>{

    const [productData, setData] = useState({ hits: [] });
    const [allProductData, setAllProductData] = useState({ hits: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await fetchData();
            setData(data);
            setAllProductData(data);
            // switch loading to false after fetch is complete
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

    const search = async (value)=>{
        if(value === ''){
            setData(allProductData);
            // switch loading to false after fetch is complete
        }else{
            const filter =filterByValue(allProductData, value)
            setData(filter);
        }
    }
    function filterByValue(array, value) {
        const reg = new RegExp(value,'i');
        return array.filter((item)=>{
            let flag;
                if(reg.test(item.title)){
                    flag =  item; // return reg.test(item.title) dmth fshi if dhe le ket
                }
            return flag;

        });
    }
    return(
        <>
            <div className="admin-products user-product-margin">
                <Row className="user-product-header">
                    <div>
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
                    </div>
                    <div>
                        <Link to={`/userOrders`}>
                        <button type="submit" style={{padding: '13px 27px'}}
                                className="edit-button">ORDER HISTORY</button>
                        </Link>
                    </div>
                </Row>
                <Row className="input-container" style={{marginLeft: "-30px", position:"relative"}}>
                    <Icon name='search user-product-icon'/>
                    <input className="input-form user-product-search" placeholder="Search"
                           onChange={(e) => search(e.target.value)} type="text"
                           />
                </Row>

                <Row>
                    <div className="user-product-container">
                    { loading ?
                        (
                            <div
                                style={{
                                    'position': 'absolute',
                                    'width': '100%',
                                    'alignItems': 'center',
                                    'display': 'flex',
                                    'justifyContent': 'center'
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
                        productData.map((obj, index) => {
                            return (
                            <Link to={`/userProducts/newOrder${obj.id}`} key={index}>
                                <div className="user-product">
                                <div>
                                    <img src={"data:image/png;charset=utf-8;base64," + obj.productImage} className="user-product-image" />
                                </div>
                                <div className="user-product-tittle">
                                    {obj.title}
                                </div>
                                <div className="user-product-footer">
                                    <span>
                                        €{obj.price}
                                    </span>
                                    <span>
                                         <Icon name='circle' style={{color: "#00BC87 "}}/>
                                        {obj.nrOfAccounts}
                                    </span>
                                </div>
                                </div>
                            </Link>
                            );
                        })
                            : null
                    }
                    </div>
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

export default UserProducts;
