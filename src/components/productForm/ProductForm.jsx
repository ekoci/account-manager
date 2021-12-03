import React, {useState, useReducer, useEffect} from 'react';
import './ProductForm.css'
import {Row, Col, Container} from "react-bootstrap";
import {convertGridRowsPropToState} from "@material-ui/data-grid";
import {Select} from "semantic-ui-react";
import apiGtw from "../../api";
import Notification from "../notification/Notification";
import {Snackbar} from "@material-ui/core";
import Alert from "react-bootstrap/Alert";
import {Redirect, useHistory} from "react-router-dom";
const uploadJSONFiles=(event) =>{
    event.preventDefault();
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append('file',file);
    formData.append('name', 'my_file');
    return formData;
}
function init() {
    return {
        deliveryTime: null,
        description: null,
        format: null,
        gate: null,
        maximum: null,
        minimum: null,
        price: null,
        sort: null,
        title: null,
        warranty: null,
        productStatus: null,
        pricePerFilter:null,
        processingType: null
    };
}
const statusOptions = [
    {  value: '1', text: 'active' },
    {  value: '2', text: 'inactive' }
]
const processingTypeOptions = [
    {  value: 'automatic', text: 'Automatic' },
    {  value: 'manual', text: 'Manual' }
]
function reducer(state, action) {
    switch (action.type) {
        case 'title':
            return { ...state,
                title: action.payload
            };
        case 'price':
            return {...state,
                price: action.payload
            };
        case 'description':
            return {...state,
                description: action.payload};
        case 'accounts':
            return {...state,
                accounts: action.payload};
        case 'maximum':
            return {...state,
                maximum: action.payload};
        case 'minimum':
            return {...state,
                minimum: action.payload};
        case 'deliveryTime':
            return {...state,
                deliveryTime: action.payload};
        case 'warranty':
            return {...state,
                warranty: action.payload};
        case 'format':
            return {...state,
                format: action.payload};
        case 'gate':
            return {...state,
                gate: action.payload};
        case 'sort':
            return {...state,
                sort: action.payload};
        case 'image':
            return {...state,
                image: action.payload};
        case 'status':
            return {...state,
                status: action.payload};
        case 'pricePerFilter':
            return {...state,
                pricePerFilter: action.payload};
        case 'processingType':
            return {...state,
                processingType: action.payload};
        default:
            throw new Error();
    }
}


const ProductForm = (props) => {
    const history = useHistory();
    const [state, dispatch] = useReducer(reducer, init);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const addProduct = async (e, productData) => {
        console.log(productData);
        e.preventDefault();
        const image = productData.image;
        const accounts = productData.accounts;
        delete productData.accounts;
        delete productData.image;

        try {
            // console.log(username,password, balance, description, email, status,coinBase, paypal, manual, user)
            const statusData  = statusOptions.filter(obj => {
                console.log(obj)
                return obj.value === productData.status
            });
            console.log(statusData)
            productData.price = parseFloat(productData.price);
            productData.gate = parseInt(productData.gate);
            productData.minimum = parseInt(productData.minimum);
            productData.maximum = parseInt(productData.maximum);
            productData.sort = parseInt(productData.sort);
            productData.pricePerFilter = parseInt(productData.pricePerFilter);
            productData.format =null;
            productData.warranty =null;
            productData.productStatus= {
                "id": productData.status,
                "description": statusData[0].text
            }
            delete productData.status;
            const formData = new FormData();
            formData.append('accounts',accounts);
            formData.append('productInfo',JSON.stringify(productData));
            formData.append('productImage',image);
            console.log(productData);
            const data = await apiGtw.post(
                'spotify/product/addProduct', formData, {
                    headers:{
                        'Content-type': 'multipart/form-data'
                    }
                });
            console.log(data)
            setSuccess(true);
            history.push("/adminProduct");
        } catch (error) {
            // add error handling here
            setSuccess(false)
            console.log(error);
        }
    }


    const handleClose = () => {
        setSuccess(false);
        setError(false);
    };
    return(
    <div className='product-form'>
        <form  onSubmit={(e)=>addProduct(e, state)} encType="multipart/form-data">
        <Row>
            <Col>
                <span className="input-label">
                    Tittle
                </span>
                <input className="input-form" placeholder="Tittle"required
                       onChange={(event) => dispatch({type: 'title', payload: event.target.value})}/>
            </Col>
            <Col>
                <span className="input-label">
                    Price
                </span>
                <input className="input-form"  placeholder="Price" required step="any"
                       onChange={(event) => dispatch({type: 'price', payload: event.target.value})}/>
            </Col>
        </Row>
        <Row className="input-container">
            <Col>
                 <span className="input-label">
                    Description
                </span>
                <textarea className="input-form" rows="4" cols="50"  placeholder="Description" required
                          onChange={(event) => dispatch({type: 'description', payload: event.target.value})}/>
            </Col>
            <Col>
                <span className="input-label">
                    Additional Cost Per Filter
                </span>
                <input className="input-form"  placeholder="Price" required type="number" step="any"
                       onChange={(event) => dispatch({type: 'pricePerFilter', payload: event.target.value})}/>
            </Col>
        </Row>
        <Row className="input-container">
            <Col>
                 <span className="input-label">
                    Accounts
                </span>
                <input type="file" className="input-form" required
                       onChange={(event) => dispatch({type: 'accounts', payload: event.target.files[0]})}
                       multiple/>
            </Col>
        </Row>
        <Row className="input-container">
            <Col>
                <span className="input-label">
                    Minimum
                </span>
                <input className="input-form" type="number" value={state.minimum} required
                       onChange={(event) => dispatch({type: 'minimum', payload: event.target.value})}/>
            </Col>
            <Col>
                <span className="input-label">
                    Maximum
                </span>
                <input className="input-form"  type="number"  value={state.maximum} required
                       onChange={(event) => dispatch({type: 'maximum', payload: event.target.value})}/>
            </Col>
        </Row>
        <Row className="input-container">
            <Col>
                <span className="input-label">
                    Maximum Gate
                </span>
                <input className="input-form"  type="number"  value={state.gate} required
                       onChange={(event) => dispatch({type: 'gate', payload: event.target.value})}/>
            </Col>
            <Col>
                <span className="input-label">
                    Sort
                </span>
                <input className="input-form" type="number" value={state.sort} required
                       onChange={(event) => dispatch({type: 'sort', payload: event.target.value})}/>
            </Col>
        </Row>
        <Row className="input-container">
            <Col>
                <span className="input-label">
                    Delivery Time
                </span>
                <input className="input-form"  placeholder=" Delivery Time" type="text" required
                       onChange={(event) => dispatch({type: 'deliveryTime', payload: event.target.value})}/>
            </Col>
        </Row>
        <Row className="input-container">
            <Col>
                <span className="input-label">
                    Warranty
                </span>
                <input className="input-form"  placeholder="Warranty" required
                       onChange={(event) => dispatch({type: 'warranty', payload: event.target.value})}/>
            </Col>
        </Row>
        <Row className="input-container">
            <Col>
                <span className="input-label">
                    Format
                </span>
                <input className="input-form"  placeholder="Format"  required={true}
                       onChange={(event) => dispatch({type: 'format', payload: event.target.value})}/>
            </Col>
        </Row>
        <Row className="input-container">
            <Col>
               <span className="input-label">
                    Status
                </span>
                <Select placeholder='Select status' className="input-form status-dropdown" options={statusOptions} required
                        onChange={ (e, { value })=> dispatch({type: 'status', payload: value})}/>
            </Col>
            <Col>
                <span className="input-label">
                    Product Image
                </span>
                <input type="file" className="input-form" required
                       onChange={(event) => dispatch({type: 'image', payload: event.target.files[0]})}
                       multiple/>
            </Col>
        </Row>
        <Row className="input-container">
            <Col>
           <span className="input-label">
                Processing Type
            </span>
                <Select placeholder='Select status' className="input-form status-dropdown" options={processingTypeOptions} required
                        onChange={ (e, { value })=> dispatch({type: 'processingType', payload: value})}/>
            </Col>
        </Row>
        <Row className="input-container">
            <Col>
                <button type="submit" className="add-product-button">ADD PRODUCT</button>
            </Col>
        </Row>
            <Snackbar open={error} autoHideDuration={4000} onClose={handleClose}>
                {error && (
                    <Alert onClose={handleClose} severity="error">
                        Error! Email may be already in use!
                    </Alert>
                )}
            </Snackbar>
            <Snackbar open={success} autoHideDuration={4000} onClose={handleClose}>
                {success && (
                    <Alert onClose={handleClose} severity="success">
                        You have added product successfully!
                    </Alert>
                )}
            </Snackbar>
        </form>



    </div>

    )
}
export default ProductForm;
