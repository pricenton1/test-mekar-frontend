import React from 'react';
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faInfoCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Button, Table} from "react-bootstrap";
import Moment from "moment"

const UserList = (props) => {
    const {edited,deleted,showDetail,users} = props
    const listUser = users.map((value)=> {
        return(
            <tr className="d-flex" key={value.userID}>
                <td className="col-3 border-top-0 border-right">{value.userNIK}</td>
                <td className="col-3 border-top-0 border-left-0 border-right">{value.userName}</td>
                <td className="col-3 border-top-0 border-left-0 border-right">{Moment(value.userBirth).format('LL')}</td>
                <td className="col-3 border-top-0 border-left-0 border-right">
                    <Button className="bg-warning m-1 border-0" onClick={()=>edited(value)}><FontAwesomeIcon icon={faEdit} /></Button>
                    <Button className="bg-danger m-1 border-0" onClick={()=>deleted(value.userID)}><FontAwesomeIcon icon={faTrash} /></Button>
                    <Button className="bg-primary m-1 border-0" onClick={()=>showDetail(value)}><FontAwesomeIcon icon={faInfoCircle} /></Button>
                </td>
            </tr>
        )
    })


    return (
        <Table striped hover size="sm">
            <thead>
            <tr className="d-flex">
                <th className="col-3 border-bottom-0 border-right">Nomor KTP</th>
                <th className="col-3 border-bottom-0 border-left-0 border-right">Nama</th>
                <th className="col-3 border-bottom-0 border-left-0 border-right">Tanggal Lahir</th>
                <th className="col-3 border-bottom-0 border-left-0 border-right">Action</th>
            </tr>
            </thead>
            <tbody>
                {listUser}
            </tbody>
        </Table>
    );
};

const mapStateToProps = (state)=>{
    return{
        users : state.userReducer.user.users
    }
}

export default connect(mapStateToProps,null)(UserList);