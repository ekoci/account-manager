import React, {useEffect, useState} from "react";
import {Container, Row, Col} from "react-bootstrap";
import {Icon} from 'semantic-ui-react';
import '../../pages/adminTicketChat/AdminTicketChat.css';
import apiGtw from "../../api";
import moment from "moment";
import {CircularProgress} from "@material-ui/core";

async function fetchTransactData(id) {
    const result = await apiGtw.get(
        '/spotify/message/getByTicket?ticketId=' + id,
    );
    return result.data;
}

const TicketChat = (props) => {
    const [message, setMessage] = useState();
    const [messageData, setMessageData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [successInitial, setInitialSuccess] = useState(false);
    const currentUser = localStorage.getItem('token')
    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await fetchTransactData(props.data.match.params.id);
            setMessageData(data);
            // switch loading to false after fetch is complete
            setInitialSuccess(true);
        } catch (error) {
            // add error handling here
            console.log(error);
            setError(true);
        }
        setLoading(false);
    }, []);
    const addMessage = async (event, description) => {
        event.preventDefault();
        const dataPost = {};
        dataPost.description = description;
        dataPost.ticketId = parseInt(props.data.match.params.id);
        dataPost.userId = localStorage.getItem('token');
        dataPost.read = '0';

        try {
            // set loading to true before calling API
            const data = await apiGtw.post(
                'spotify/message/addNew', dataPost
            );
            const dataChat = await fetchTransactData(props.data.match.params.id);
            setMessageData(dataChat);

        } catch (error) {
            // add error handling here
            console.log(error);
        }
    };
    return (
        <>
            <Row className='admin-ticket-chat'>
                <Col>
                    <span className="chat-label">Eveniet a quos praesentium explicabo dignissimos.</span>
                    <div style={{
                        height: '500px',
                        overflowY: "auto"
                    }}>
                        {
                            loading ?
                                (
                                    <div style={{
                                        'width': '100%',
                                        "alignItems": 'center',
                                        "display": 'flex',
                                        'justifyContent': 'center'
                                    }}>
                                        <CircularProgress
                                            color="#00BC87"
                                            style={{color: "#00BC87!important"}}
                                        />
                                    </div>
                                )
                                :
                                successInitial ?
                                    messageData.map(( (message,  index)=> {
                                        return (
                                            <div className={message.userId === currentUser ? 'admin-message' : 'user-message'} key={index}>
                                                <div
                                                    className={message.userId === currentUser ? 'ticket-image-admin' : 'ticket-image-user'}>
                                                    {/*{message.user.username.charAt(0)}*/}
                                                </div>
                                                <div
                                                    className={message.userId === currentUser ? 'message' : 'user-mesage-color'}>
                                                    <div className="message-header">
                                    <span>
                                        {/*{message.user.username}*/}
                                    </span>
                                                        <span>
                                             {moment(message.createdAt).format('DD MMM YYYY h:mm A')}
                                    </span>
                                                    </div>
                                                    <div>
                                                        {message.description}
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    }))
                                    : null
                        }
                    </div>
                    <div style={{marginRight: '95px', marginLeft: '95px'}}>
                        <form onSubmit={(e) => addMessage(e, message)}>
                            <Row>
                             <textarea className="input-form" rows="6" cols="50" placeholder="Repaly"
                                       onChange={(e) => setMessage(e.target.value)}
                             />
                            </Row>
                            <Row className="input-container">
                                <button type="submit" className="add-product-button"
                                >Reply
                                </button>
                            </Row>
                        </form>
                    </div>

                </Col>


            </Row>
        </>

    );
}


export default TicketChat;