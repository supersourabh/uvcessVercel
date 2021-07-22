import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Alerts from '../HomeComponents/Alerts';
import Loading from '../HomeComponents/Loading';
import { Table, Button } from "react-bootstrap";
import { adminDeleteAction, adminListAction } from '../Actions/AllActions';

export default function AdminListScreen(props) {

    const [list, setList] = useState("members")
    const [next, setNext] = useState(1)


    const adminList = useSelector(state => state.adminList)
    var { membersList, loading, success, error } = adminList;




    const adminDelete = useSelector(state => state.adminDelete)
    const { loading: deleteLoading, error: deleteError, success: deleteSuccess } = adminDelete;

    const dispatch = useDispatch()






    const listFn = (e, list) => {
        e.preventDefault()
        dispatch(adminListAction(list, 1))
    }


    const deleteHandler = (id, e) => {
        e.preventDefault()
        dispatch(adminDeleteAction(id))
    }
    useEffect(() => {

        if (deleteSuccess) {
            dispatch(adminListAction(list, next))
        }

    }, [deleteSuccess, dispatch, list, next])



    return (
        <div className="sem">
            <ul>

                <h2 style={ { color: "green", textAlign: "center", textDecoration: "underline" } }>INFORMATION</h2>
                <text className="btn btn-info" style={ { marginBottom: 10 } }>Please click get on changing ,otherwise you may get wrong !!!  (We are working on that )</text>
                <div style={ { padding: 10, marginBottom: 5, border: 3, borderStyle: "solid", borderColor: "#dc9299" } }>

                    <select required onChange={ (e) => {
                        setList(e.target.value)
                    } } >
                        <option value="members" >Members</option>
                        <option value="crs" >Crs</option>
                        <option value="students" >Students</option>
                        <option value="material" >Material</option>
                        <option value="materialOther" >Other</option>
                    </select>
                    <Button variant="success" onClick={ (e) => listFn(e, list) } >Get List of { `${list}` }</Button>
                </div>

                {
                    loading ? <Loading /> :
                        error ? <Alerts info="danger" message={ error } /> :
                            deleteLoading ? <Loading /> :
                                deleteError ? <Alerts info="danger" message={ "Error in delete " } /> :
                                    membersList.length === 0 ?
                                        <div style={ { backgroundColor: "red", border: 2, borderStyle: "solid", borderColor: "#dc9292" } }>
                                            <h4 style={ { color: "#fff", padding: 10, textAlign: "center" } }>No List...!(Retry)</h4>
                                        </div> : ''
                }
                {
                    success && (list === "members" || list === "students" || list === "crs") ?
                        <li>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>_id</th>
                                        <th>Name</th>
                                        {
                                            list === "members" &&
                                            <th>Work</th>
                                        }

                                        <th>Contact</th>
                                        {
                                            list === "members" ?
                                                null : <th>Sem</th>
                                        }
                                        <th>Delete</th>
                                    </tr>
                                </thead>







                                {
                                    membersList.map(member =>

                                        <tbody>
                                            <tr>
                                                <td>{ member._id }</td>
                                                <td>{ member.name }</td>
                                                {
                                                    list === "members" &&
                                                    <td>{ member.work }</td>
                                                }
                                                <td>{ member.contact ? member.contact : "---" }</td>
                                                {
                                                    list !== "members" &&
                                                    <td>{ member.sem }</td>
                                                }
                                                <td><Button variant="danger" onClick={ (e) => deleteHandler(member._id, e) }>Delete</Button></td>
                                            </tr>
                                        </tbody>
                                    )
                                }

                            </Table>
                        </li> :
                        <li>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>_id</th>
                                        <th>Subject</th>
                                        <th>Branch</th>
                                        {
                                            list === "materialOther" &&
                                            <th>Type</th>
                                        }
                                        <th>Sem</th>
                                        <th>Professor</th>
                                        <th>View</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>


                                {
                                    success &&
                                    membersList.map(member =>

                                        <tbody>
                                            <tr>
                                                <td>{ member._id }</td>
                                                <td>{ member.subject }</td>
                                                <td>{ member.branch }</td>
                                                {
                                                    list === "materialOther" &&
                                                    <td>{ member.type }</td>
                                                }
                                                <td>{ member.sem }</td>
                                                <td>{ member.professor ? member.professor : "----" }</td>
                                                <td><Button variant="warning" onClick={ (e) => props.history.push(`/material/view/${member._id}`) }>View</Button></td>
                                                <td><Button variant="danger" onClick={ (e) => deleteHandler(member._id, e) }>Delete</Button></td>
                                            </tr>
                                        </tbody>
                                    )
                                }

                            </Table>
                        </li>

                }




            </ul>

        </div>
    )
}
