import React,{useState} from "react";
import {Row,Col} from "react-bootstrap";
import { Select } from 'semantic-ui-react'
import apiGtw from "../../api";
import {CircularProgress, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const productOptions = [
    { key: 'spotify', value: '1', text: 'Spotify' },
    { key: 'netflix', value: '2', text: 'Netflix' }

]




const CustomPrice = (props)=>{

    const [product, setProduct]= useState();
    const [price, setPrice]= useState('');

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const customPriceFunction = async (e, product, price, user) => {
        e.preventDefault();
        try {
            setLoading(true);
            const customProductPrice = {
                "endDate": new Date(),
                "price":price,
                "product": {
                    "id": product
                },
                "user":user
            }
            // // set loading to true before calling API
            const data = await apiGtw.post(
                'spotify/customProductPrice/postNew',customProductPrice
            );
            setSuccess(true);
        } catch (error) {
            // add error handling here
            console.log(error);
            setError(true);
        }
        setLoading(false);
    };

    const handleClose = () => {
        setSuccess(false);
        setError(false);
    };
    return(
        <>
            <form  onSubmit={(e)=>customPriceFunction(e, product, price, props.user)}>
            <div className="order-detail">
                <Row>
                    <span className="input-label">
                        Product
                    </span>
                    {/*<input className="input-form"/>*/}
                    <Select placeholder='Select Product' className="input-form status-dropdown" options={productOptions} required={true}
                            onChange={ (e, { value }) => setProduct(value)}/>
                </Row>
                <Row className="input-container">
                    <span className="input-label">
                            Price
                        </span>
                    <input className="input-form" type="number" value={price} required={true}
                           onChange={(e) => setPrice(e.target.value)}
                    />
                </Row>
                <Row className="input-container">
                    <Col style={{padding: '0px'}}>
                        <button type="submit" className="edit-button" style={{padding: '13px 27px'}}
                               >UPDATE</button>
                    </Col>
                </Row>
                <Row>
                    { loading ?
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
                        :null
                    }
                </Row>
            </div>
            </form>

            <Snackbar open={error} autoHideDuration={4000} onClose={handleClose}>
                {error && (
                    <Alert onClose={handleClose} severity="error">
                        Error! Couldn't process request!
                    </Alert>
                )}
            </Snackbar>
            <Snackbar open={success} autoHideDuration={4000} onClose={handleClose}>
                {success && (
                    <Alert onClose={handleClose} severity="success">
                        You have added custom price successfully!
                    </Alert>
                )}
            </Snackbar>
        </>

    );
}

export default CustomPrice;
