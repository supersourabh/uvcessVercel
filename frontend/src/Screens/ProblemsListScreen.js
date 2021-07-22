import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { problemListAction } from '../Actions/AllActions';
import Loading from '../HomeComponents/Loading';
import Alerts from '../HomeComponents/Alerts';

export default function ProblemsListScreen(props) {
    const problemsList = useSelector(state => state.problemsList)
    const{problems , loading ,error}=problemsList;

    const dispatch = useDispatch()

    useEffect(() => {
        
        dispatch(problemListAction())

    }, [dispatch])

    return (
        <div className="problemsList">
            <ul>
                
                <h2>Problems List</h2>
                {
                    loading?<Loading/>:
                    error?<Alerts info="danger" message={error}/>:
                    problems.length===0?
                    <li>
                        <div><h4>No Problems .....ahhhh</h4></div>
                    </li>:
                    problems.map(item=>
                    <li>
                        <div><h6>Problem : </h6><b>{item.problem} </b></div>
                        <div><h6>Statement : </h6><b>{item.statement}</b></div>
                        <div><h6>student : </h6><b>{item.student}</b></div>
                    </li>
                    )

                    
                }
            </ul>

        </div>
    )
}
