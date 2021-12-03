import React, {useEffect, useState} from "react";
import Alert from 'react-bootstrap/Alert';
import "./Notification.css"
const Notification = (props)=>{
    return(
        <>
            <Alert variant={props.variant} className="notification"  onClose={props.onClose} dismissible>
                <Alert.Heading> {props.content}</Alert.Heading>
            </Alert>
        </>

    );
}


export default Notification;