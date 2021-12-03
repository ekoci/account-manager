import React, {useEffect, useState} from "react";
import {Button, InputGroup, FormControl, Col} from "react-bootstrap";
import "./addAnnouncement.css"
import apiGtw from "../../api";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
async function fetchTransactData(id) {
    const result = await apiGtw.get(
        'spotify/user/getById?userId='+id,
    );
    return result.data;
}
const AddAnnouncement = props => {
    const [addAnnouncement, setAnnouncement]= useState('');
    const [errorAnn, setError] = useState(false);
    const [successAnn, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userData, setData] = useState({});
    const addAnnouncementFunctions = async (e, announcement) => {
        e.preventDefault();
        const annData ={
            description: announcement,
            user:userData
        }
        try {
            setLoading(true);
            const data = await apiGtw.post(
                'spotify/announcement/addNew',annData
            );
            setSuccess(true);
            window.location.reload();
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
    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await fetchTransactData(localStorage.getItem('token'));
            setData(data);
            // setSuccess(true);
        } catch (error) {
            // add error handling here
            console.log(error);
            setError(true);
        }
        setLoading(false);
    }, []);
    return (
        <>
            <form onSubmit={(e)=>addAnnouncementFunctions(e, addAnnouncement)}>
                <span className="announcement-header">Add Announcement</span>
                <div className="announcement">
                <span  className="announcement-label">
                    Announcement
                </span>
                    <div className="announcement-field">
                        <InputGroup>
                            <FormControl as="textarea" aria-label="With textarea" placeholder="Announcement" required
                                         onChange={ (e) => setAnnouncement(e.target.value)} />
                        </InputGroup>
                    </div>
                    <button type="submit" className="edit-button"  style={{padding: '13px 27px', marginTop:'30px'}}
                            >
                        ADD ANNOUNCEMENT
                    </button>
                </div>
            </form>
            <Snackbar open={successAnn} autoHideDuration={4000} onClose={handleClose}>
                {successAnn && (
                    <Alert onClose={handleClose} severity="success">
                        You have added successfully!
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

export default AddAnnouncement
