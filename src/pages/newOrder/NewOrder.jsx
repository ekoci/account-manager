import React, {useState, useEffect, useReducer} from 'react';
import './NewOrder.css'
import {Row, Button, Nav, Col} from "react-bootstrap";
import apiGtw from '../../api';
import moment from "moment";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {CircularProgress} from "@material-ui/core";
import {useHistory} from "react-router-dom";
async function fetchTransactData(id, body) {
    const result = await apiGtw.post(
        'spotify/product/getAccountProductInfo?prodId='+id, body
    );
    return result.data;
}
async function fetchUserData(id) {
    const result = await apiGtw.get(
        'spotify/user/getById?userId='+id,
    );
    return result.data;
}
const NewOrder = (props) => {
    const history = useHistory();
    const [orderData, setData] = useState({});
    const [country, setCountry]= useState('');
    const [subscription, setSubscription]= useState('');
    const [formats, setFormats]= useState("N/A");
    const [quantity, setQuantity]= useState(0);
    const [stock, setStock]= useState(0);
    const [finalCost, setFinalCost]= useState(0);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [countryFilter, setCountryFilter] = useState({});
    const [subFilter, setSubFilter] = useState({});
    const [finalFilter, setFinalFilter] = useState({});
    const costCalculation = ()=>{
        let subSelected;
        let conSelected;
        if (subscription !== 'N/A' && subscription !== null){
            subSelected = 1
        }else{
            subSelected = 0
        }
        if (country !== 'N/A' && country !== ''){
            conSelected = 1
        }else{
            conSelected = 0
        }
        const value = orderData.product.pricePerFilter * (subSelected + conSelected) + orderData.product.price * quantity;
        setFinalCost(value)
    }
    const newOrderFunction = async (evt)=>{
        evt.preventDefault();
        try {
            setLoading(true);
        const newOrder = {
            id:null,
            product : orderData.product,
            user: userData,
            orderDate: new Date(),
            filters:finalFilter,
            value:finalCost,
            orderStatus:{
                "id": 3,
                "description": "processing",
                "notes": null
            },
            quantity:quantity

        }
             newOrder.filters = newOrder.filters.filter(function(item) {
                return item.filterValue !== ''
            })
        const response = await apiGtw.post(
            'spotify/order/addNew',newOrder
        );
        setSuccess(true);
        history.push('/userOrders')
        } catch (error) {
            // add error handling here
            console.log(error);
            setError(true);
        }
        setLoading(false);
    }
    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await fetchTransactData(props.match.params.id, []);
            setData(data);
            setStock(data.stock);
            data.countries.push('N/A');
            data.subscriptionTypes.push('N/A');
            setCountry(data.countries[data.countries.length-1]);
            setSubscription(data.subscriptionTypes[data.subscriptionTypes.length-1]);
            const user = await fetchUserData(localStorage.getItem('token'));
            setUserData(user)
            // switch loading to false after fetch is complete

        } catch (error) {
            // add error handling here
            console.log(error);
        }
        setTimeout( setLoading(false), 3000);
    }, []);

    useEffect(() => {
        console.log('useEffect orderData', orderData)
        if(Object.keys(orderData).length !== 0){
            costCalculation()
        }

    }, [subscription, country, quantity, orderData]);
    useEffect(async () => {
        let filters =[]
        if(Object.keys(countryFilter).length !== 0 && Object.keys(subFilter).length !== 0){
             filters = [countryFilter, subFilter]
        }else if (Object.keys(countryFilter).length !== 0){
             filters[0] = countryFilter
        }else if(Object.keys(subFilter).length !== 0){
            filters[0]  = subFilter
        }else{
             filters = [];
        }
        console.log(filters)
        try {
            const data = await fetchTransactData(props.match.params.id, filters);
            setStock(data.stock);
            setFinalFilter(data.filters);
            console.log('onSubscriptionChange',data)
            // switch loading to false after fetch is complete

        } catch (error) {
            // add error handling here
            console.log(error);
        }

    }, [countryFilter, subFilter]);
    const onFilterChange = async (value, type) =>{
        if(type === 'country'){
            setCountry(value);
        }
        if(type === 'subscription'){
            setSubscription(value);
        }
         let filter = {}
        if(type === 'country' && value !== 'N/A'){
            filter={
                "description": "country",
                "filterValue": value,
                "price": orderData.product.pricePerFilter,
                "orders": []
            }
            setCountryFilter(filter)
        }
        if(type === 'subscription' && value !== 'N/A'){
            filter= {
                "description": "subscription",
                "filterValue": value,
                "price":  orderData.product.pricePerFilter,
                "orders": []
            }
            setSubFilter(filter)
        }
        console.log('filter',filter)
    }
    return (
        <>
            <div className="admin-transaction">
                <Row style={{marginLeft: '-30px'}}>
                    <span className="admin-transaction-tittle">
                        Products
                    </span>
                </Row>
                <Row>
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
                        <>
                            <Col className="transaction-label-column" md={8}>
                                <Row >
                                    <div style={{
                                        width: "100%",
                                        paddingRight: "30px"
                                    }} >
                                        <span className="transaction-label">New Order</span>
                                        <form>
                                            <div className="order-detail">
                                                <div >
                                                <span className="input-label">
                                                        Quantity
                                                    </span>
                                                    <input className="input-form" type="number" value={quantity}
                                                           required={true}
                                                           onChange={ (e) => setQuantity(e.target.value)}
                                                    />
                                                </div>
                                                <div className="input-container">
                                                    <span className="input-label">
                                                        Subscription
                                                    </span>
                                                    <Autocomplete   className="input-form autocomplete-input"
                                                        id="combo-box-demo"
                                                        options={ orderData.subscriptionTypes}
                                                        getOptionLabel={(option) => option}
                                                        value={subscription}
                                                        onChange={(event, newValue) => {
                                                            onFilterChange(newValue, 'subscription');
                                                        }}
                                                        renderInput={(params) =>
                                                            <TextField {...params} />}
                                                    />
                                                </div>

                                                <div className="input-container">
                                                      <span className="input-label">
                                                        Country
                                                    </span>
                                                    <Autocomplete   className="input-form autocomplete-input"
                                                                    id="combo-box-demo"
                                                                    options={ orderData.countries}
                                                                    getOptionLabel={(option) => option}
                                                                    value={country}
                                                                    onInputChange={(event, newValue) => {
                                                                        onFilterChange(newValue, 'country');
                                                                    }}
                                                                    renderInput={(params) =>
                                                                        <TextField {...params} />}
                                                    />
                                                </div>
                                                <div className="input-container">
                                                <span className="input-label">
                                                        Format
                                                    </span>

                                                    <input list="formatList"
                                                           type="text" data-shrink="1"
                                                           className="input-form"
                                                           value={formats}
                                                           onChange={ (e) => setFormats(e.target.value)}
                                                    />
                                                    <datalist id="formatList">
                                                        {
                                                            orderData.formats.map((obj, index) => {
                                                                return <option value={obj} key={index}/>
                                                            })
                                                        }
                                                    </datalist>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                </Row>
                                <Row style={{
                                    paddingRight: "30px"
                                }}>
                                    <Col >
                                        <div className="new-order-product-detail">
                                        <Row>
                                            <Col className="new-order-product-item">
                                                <span className="new-order-product-item-header">
                                                    Product
                                                </span>
                                                <span className="new-order-product-item-label">
                                                    {orderData.product.title}
                                                </span>
                                            </Col>
                                            <Col className="new-order-product-item">
                                                <span className="new-order-product-item-header">
                                                    Price Per Account
                                                </span>
                                                <span className="new-order-product-item-label">
                                                    €{orderData.product.price}
                                                </span>
                                            </Col>
                                        </Row>
                                        <Row className="mt-5">
                                            <Col className="new-order-product-item">
                                                <span className="new-order-product-item-header">
                                                    Minimum
                                                </span>
                                                <span className="new-order-product-item-label">
                                                    {orderData.product.minimum}
                                                </span>
                                            </Col>
                                            <Col className="new-order-product-item">
                                                <span className="new-order-product-item-header">
                                                    Maximum
                                                </span>
                                                <span className="new-order-product-item-label">
                                                     {orderData.product.maximum}
                                                </span>
                                            </Col>
                                        </Row>
                                            <Row className="mt-5">
                                                <Col className="new-order-product-item">
                                                <span className="new-order-product-item-header">
                                                    Delivery Time
                                                </span>
                                                    <span className="new-order-product-item-label">
                                                     {moment(orderData.product.deliveryTime).format('DD MMM YYYY')}
                                                </span>
                                                </Col>
                                                <Col className="new-order-product-item">
                                                <span className="new-order-product-item-header">
                                                    Warranty
                                                </span>
                                                    <span className="new-order-product-item-label">
                                                    €{orderData.product.warranty}
                                                </span>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className="new-order-stock">
                                            <span className="new-order-product-item-header">Stock</span>
                                            <span className="new-order-product-item-label">{stock} Accounts</span>
                                        </div>
                                    </Col>
                                    <Col >
                                        <div className="new-order-description">


                                        <span className="new-order-description-header">
                                            Description
                                        </span>
                                        <span className="new-order-description-label">
                                            Maiores quia dolor id neque. Delectus quo sunt quis nam ea sed. Nobis cum libero
                                            voluptatum perspiciatis dignissimos vero sunt voluptates. Harum non ut epud iandae qui. Maiores quia dolor id neque.
                                            Delectus quo sunt quis nam ea sed.
                                            Nobis cum libero voluptatum perspiciatis dignissimos vero sunt voluptates. Harum non ut epud iandae qui.
                                        </span>

                                        <span className="new-order-description-label">
                                            Maiores quia dolor id neque. Delectus quo sunt quis nam ea sed. Nobis cum libero voluptatum perspiciatis dignissimos vero sunt voluptates.
                                            Harum non ut epud iandae qui. Maiores quia dolor id neque.
                                            Delectus quo sunt quis nam ea sed. Nobis cum libero voluptatum perspiciatis dignissimos vero sunt voluptates. Harum non ut epud iandae qui.
                                        </span>
                                        </div>
                                    </Col>

                                </Row>
                            </Col>
                            <Col className="transaction-label-column" md={4}>
                                <span className="transaction-label">Purchase</span>
                                <div className="new-order-purchase">
                                    <div className="purchased-total-cost">
                                        <span className="new-order-description-header"> Total Cost</span>
                                        <span className="purchased-total-label">€ {finalCost}</span>
                                        <span className="new-order-description-label">You have € {userData.balance}</span>
                                    </div>
                                    <div>
                                        <div className="new-order-product-item">
                                                <span className="new-order-product-item-header">
                                                    Quantity
                                                </span>
                                            <span className="new-order-product-item-label">
                                                    {quantity}
                                                </span>
                                        </div>
                                                <div className="new-order-product-item mt-4">
                                                <span className="new-order-product-item-header">
                                                    Filters
                                                </span>
                                                <span className="new-order-product-item-label">
                                                    Subscription - {subscription}
                                                </span>
                                                <span className="new-order-product-item-label">
                                                    Country - {country}
                                                </span>
                                                </div>
                                        <div className="new-order-product-item  mt-4">
                                                <span className="new-order-product-item-header">
                                                    Additional Cost Per Account
                                                </span>
                                            <span className="new-order-product-item-label">
                                                    € {orderData.product.pricePerFilter}
                                                </span>
                                        </div>
                                        <div className="new-order-product-item  mt-4">
                                                <span className="new-order-product-item-header">
                                                    Format
                                                </span>
                                            <span className="new-order-product-item-label">
                                                       {formats}
                                                </span>
                                        </div>
                                    </div>
                                    <div className="new-order-button">
                                        <button type="submit" className="edit-button" disabled={quantity>stock}
                                                style={{padding: '13px 27px'}}
                                                onClick={(event) => newOrderFunction(event)}
                                        >
                                            PURCHASE
                                        </button>
                                    </div>
                                </div>

                            </Col>
                        </>
                    }
                </Row>

            </div>
        </>

    );
}

export default NewOrder;
