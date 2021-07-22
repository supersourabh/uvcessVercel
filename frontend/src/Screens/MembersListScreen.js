import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { membersAction } from '../Actions/AllActions';
import Alerts from '../HomeComponents/Alerts';
import Loading from '../HomeComponents/Loading';

export default function MembersListScreen() {

    const members = useSelector(state => state.members)
    const{membersList , loading , error}=members;

    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(membersAction())

    }, [dispatch])


    return (
    <div className="sem">
        <ul>
            
                <h2 style={{color:"green" , textAlign:"center" , textDecoration:"underline"}}>MEMBERS</h2>
            
                {
                    loading?<Loading/>:
                    error? <Alerts info="danger" message={error}/> :
                    membersList.length===0?
                    <li>
                        <div><h4>No Member found, Sorry ...!</h4></div>
                    </li>:
                    membersList.map(member=>
                    <li>
                        <div><h6>Name : </h6><b>{member.name}</b></div>
                        <div><h6>Work : </h6><b>{member.work}</b></div>
                        <div><h6>Contact :</h6><b>{member.contact}</b></div>
                    </li>
                    )
                }
            
        </ul>
        
    </div>
    )
}
