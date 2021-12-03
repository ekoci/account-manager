import React from "react";
// import './AdminProducts.css'
import {Container,Row,Button} from "react-bootstrap";
import {Icon} from 'semantic-ui-react'
import ProductForm from "../../components/productForm/ProductForm";
import {Link} from "react-router-dom";

const AdminAddProducts = ()=>{
    return(
        <>
            <Container>
                <Row className="page-back">
                    <Link to='/adminProduct'>
                        <Icon name='angle left' />
                        <span>Products</span>
                    </Link>

                </Row>
                <div className="admin-add-products">
                    <Row>
                    <span className="admin-products-title">
                        Add Product
                    </span>
                    </Row>
                    <Row>
                    <span className="admin-products-label">
                        Product Details
                    </span>
                    </Row>
                    <Row className="button-container">
                        <Button className="admin-products-button">Products</Button>
                        <Button className="admin-products-button add-product">Add Product</Button>
                    </Row>

                    <Row>
                        <ProductForm/>
                    </Row>
                </div>
            </Container>
        </>

    );
}

export default AdminAddProducts;
