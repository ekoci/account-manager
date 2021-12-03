import React from "react";
import {ProgressBar,Row,Col} from "react-bootstrap";
import "./progresBar.css"
const ProgressBarComponent = props => {
    return (
        <>
            <div className="progress-container">
                <Row>
                  <Col>
                      <span className="progress-label">Completed Orders</span>
                      <ProgressBar variant="success" now={70}  label={"25 / 34"}/>
                  </Col>
                    <Col>
                        <span className="progress-label">Processing Orders</span>
                        <ProgressBar variant="success" now={40} label={"25 / 34"}/>
                    </Col>
                </Row>
                <Row style={{marginTop:30}}>
                    <Col>
                        <span className="progress-label">Replacements</span>
                        <ProgressBar variant="success" now={30} label={"25 / 34"}/>
                    </Col>
                    <Col>
                        <span className="progress-label">Canceled Orders</span>
                        <ProgressBar variant="success" now={50} label={"25 / 34"}/>
                    </Col>
                </Row>
            </div>

        </>

    );
}

export default ProgressBarComponent