import React, {useEffect, useState} from "react";
import apiGtw from "../../api";
import moment from "moment";
import {CircularProgress, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
async function fetchData() {
    const result = await apiGtw.get(
        'spotify/announcement/getAll',
    );
    return result.data;
}

const UserAnnouncements = (props) => {
    const [announcement, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(false);

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const handleClose = () => {
        setSuccess(false);
        setError(false);
    };
    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await fetchData();
            setData(data);
            setUser(data.user);
            // switch loading to false after fetch is complete
            setSuccess(true);
        } catch (error) {
            // add error handling here
            setError(true);
            console.log(error);
        }
        setLoading(false);
    }, []);

    return (
        <>
            <span className="announcement-header">Announcements</span>
            <div className="announcements" style={{padding: '30px'}}>
                {loading ?
                    (
                        <div
                            style={{
                                'width': '100%',
                                'align-items': 'center',
                                'display': 'flex',
                                'justify-content': 'center'
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
                    announcement.map((obj, index) => {
                        return (
                            <div style={{display:"flex", flexDirection:"row"}} key={index}>

                                <div className="left-border">
                                    <span className="dot"></span>
                                </div>
                                <div
                                    className="announcements-content-user" key={index}>
                                <span className="announcements-date">
                                {moment(obj.createdAt).format('DD MMM YYYY h:mm:ss')}
                                   </span>
                                    <span className="announcements-text">
                                {obj.description}
                                </span>

                                </div>
                            </div>

                        );
                    })
                        : null
                }
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

export default UserAnnouncements