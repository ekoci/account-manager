import React, {useEffect, useState} from 'react';
import "./LanddingPage.css"
import {Container,Row, Col,Dropdown} from "react-bootstrap";
import logo from '../../assets/logo.png'
import footerImage from '../../assets/landing_photo.svg'
import apiGtw from "../../api";
import { Icon } from 'semantic-ui-react'
import {Link} from "react-router-dom";
async function fetchLandingData() {
    const result = await apiGtw.get(
        '/spotify/account/getAllSold',
    );
    return result.data;
};
const LandingPage = () => {


    const [dashboardData, setData] = useState(0);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token') || false;
    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await fetchLandingData();
            setData(data);
            console.log(data);
            // switch loading to false after fetch is complete
            setLoading(false);
        } catch (error) {
            // add error handling here
            setLoading(false);
            console.log(error);
        }
    }, []);
    return (
        <div className='landing-page'>

            <Row style={{marginTop: "22px"}}>
                <Col md={2}>

                </Col>
                <Col md={8}>
                    <Row className="landing-header">

                        {
                            token ?
                                null
                                :
                                <>
                                    <div> <img src={logo} className="landing-logo-photo"  alt="logo"/></div>
                                    <div className="landing-header-button">
                                        <Link to='/login'>
                                        <div className="landing-sign-in">
                                            <Icon  name='lock' />
                                            SIGN IN
                                        </div>
                                        </Link>
                                        <div>
                                            <Link to='/register'>
                                            <button type="button" className="edit-button"  style={{padding: '13px 27px'}}>
                                                SIGN UP
                                            </button>
                                            </Link>
                                        </div>
                                    </div>
                                </>
                        }

                    </Row>
                </Col>
                <Col md={2}>

                </Col>
            </Row>
            <Row>

                <Col md={1}>
                </Col>
                <Col md={10}>
                    <Row className="landing-tittle">
                        <span>
                            Buy accounts <br/> with ease today.
                        </span>
                    </Row>
                    <Row className="landing-description">
                        <span>
                            Accounds use a revolutionary automated system to offer <br/>
                            affordable & high-quality accounts for everyone.
                        </span>
                    </Row>
                    <Row className="landing-button">
                            <button type="button" className="get-started-button" >
                                GET STARTED
                            </button>
                    </Row>
                    <Row className="landing-footer">
                        <Col>
                            <img src={footerImage} className="landing-image"  alt="logo"/>
                        </Col>
                        <Col>
                            <div className="landing-footer-content">
                                 <span className="landing-label">
                                    We have sold
                                </span>
                                <span className="landing-number">
                                    {dashboardData}
                                </span>
                                <span className="landing-label">
                                   Accounts
                                </span>
                            </div>
                        </Col>
                        <Col className="landing-image-right">
                            <img src={footerImage} className="landing-image"  alt="logo"/>
                        </Col>

                    </Row>
                </Col>
                <Col md={1}>
                </Col>
            </Row>


        </div>


    )
}
export default LandingPage;
