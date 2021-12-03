import React from "react";
import { DataGrid } from '@material-ui/data-grid';
import './Table.css'
const Table = ({tableData,type, event, header, ...props })=>{
    return(
            <div style={{ height: 400, width: '100%' }} className="spotify-table">
                <DataGrid rows={tableData} columns={header} pageSize={5}  />
            </div>
    )
}

export default Table