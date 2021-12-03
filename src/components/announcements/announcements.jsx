import React, {useEffect, useState} from "react";
import {Button,InputGroup,FormControl} from "react-bootstrap";
import "./announcements.css"
import apiGtw from "../../api";
import moment from "moment";
import Table from "../table/Table";
import {Icon} from "semantic-ui-react";
import {CircularProgress, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
async function fetchData() {
    const result = await apiGtw.get(
        'spotify/announcement/getAll',
    );
    return result.data;
}

const Announcements = (props) => {
    const [announcement, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(true);


    const [errorAnn, setError] = useState(false);
    const [successAnn, setSuccess] = useState(false);

    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await fetchData();
            setData(data);
            setUser(data.user);
            // switch loading to false after fetch is complete
            // setSuccess(true);
        } catch (error) {
            // add error handling here
            setError(true);
            console.log(error);
        }
        setLoading(false);

    }, []);


   const deleteAnnouncement = async (announcement)=>{
        try {
            setLoading(true);
            const data = await apiGtw.delete(
                'spotify/announcement/deleteAnnouncement',{data: announcement}
            );
            setSuccess(true);
        } catch (error) {
            // add error handling here
            console.log(error);
            setError(true);
        }
       setLoading(false);
    }
    const handleClose = () => {
        setSuccess(false);
        setError(false);
    };
    return (

        <>
            <span className="announcement-header">Announcements</span>
            <div className="announcements" style={{padding: '30px'}}>
                { loading ?
                    <div style={{
                        'width': '100%',
                        'alignItems': 'center',
                        'display': 'flex',
                        'justifyContent': 'center'
                    }}>
                        <CircularProgress
                            color="#00BC87"
                            style={{ color: "#00BC87!important" }}
                        />
                    </div>
                    :
                    announcement.map((obj, index) => {
                        return (
                            <div style={{display:"flex", flexDirection:"row"}}>

                                <div className="left-border">
                                    <span className="dot"></span>
                                </div>
                                <div
                                    className="announcements-content-user" key={index} style={{width:'100%'}}>
                                <span className="announcements-date">
                                {moment(obj.createdAt).format('DD MMM YYYY h:mm:ss')}
                                   </span>
                                    <span className="announcements-text">
                                {obj.description}
                                </span>

                                    <div className="announcement-footer">
                                         <span className="announcements-author">Announced by
                                            <span style={{color: '#00BC87'}}> {obj.user.username}</span>
                                         </span>
                                        <Icon name='trash' className="announcement-icon" onClick={()=>deleteAnnouncement(obj)}/>
                                    </div>


                                </div>

                            </div>
                        );
                    })
                }
            </div>
            <Snackbar open={successAnn} autoHideDuration={4000} onClose={handleClose}>
                {successAnn && (
                    <Alert onClose={handleClose} severity="success">
                        You have deleted successfully!
                    </Alert>
                )}
            </Snackbar>
            <Snackbar open={errorAnn} autoHideDuration={4000} onClose={handleClose}>
                {errorAnn && (
                    <Alert onClose={handleClose} severity="error">
                        Error! We could not proceed your request!
                    </Alert>
                )}
            </Snackbar>
        </>
    );
}

export default Announcements
