import React from 'react'
import { useDispatch } from 'react-redux'
import { signout } from '../Actions/AllActions';

export default function SignOut() {

    const dispatch = useDispatch();

    const clickHandler=()=>{
        dispatch(signout())
    }
    
    
    return (
        <div>
            <i onClick={clickHandler} className="fas fa-power-off"></i>
        </div>
    )
}
