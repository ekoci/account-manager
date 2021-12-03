import moment from "moment";

export  const formatDate = (date) =>{
    const cdate = moment(date).format('DD MMM YYYY h:mm:ss');
    return cdate;
}