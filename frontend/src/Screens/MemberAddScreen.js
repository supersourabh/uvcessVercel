import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { membersAddAction } from '../Actions/AllActions';
import Alerts from '../HomeComponents/Alerts';
import Loading from '../HomeComponents/Loading'

export default function MemberAddScreen() {

    const [name, setName] = useState()
    const [work, setWork] = useState()
    const [contact, setContact] = useState()


    const memberAdd = useSelector(state => state.memberAdd)
    const {loading ,error ,success} = memberAdd;

    const dispatch = useDispatch()

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(membersAddAction({name , work , contact}))
    }


    return (
        <div className="register"  style={{ backgroundImage: `linear-gradient(to right, #5b6061,#bcdbf7`, }}>
            <form onSubmit={submitHandler}>
             <ul>
                    <li>
                        <h2>Add Member</h2>
                    </li>
                    {
                        loading ?<Loading/>:
                        error ? <Alerts info="danger" message={error} />:
                        success && <Alerts info="success" message="member create success"/>
                    }
                    <li>
                        <label htmlFor="name"> Member Name : </label>
                        <input type="text" required placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="rollNo" > Work : </label>
                        <input type="text" required placeholder="Enter RollNo" value={work} onChange={(e)=>setWork(e.target.value)} />
                    </li>
                   
                        
                    <li>
                        <label htmlFor="contact">Contact( only numbers) :</label>
                        <input type="tel" required onChange={(e)=>setContact(e.target.value)} maxLength="10" pattern="[0-9]{10}" placeholder="Enter Mobile-Number" />
                    </li>
                        
                      
                    <li>
                        <button type="submit"  className="btn btn-success">submit</button>
                    </li>
                </ul>
        </form>
        </div>
    )
}
