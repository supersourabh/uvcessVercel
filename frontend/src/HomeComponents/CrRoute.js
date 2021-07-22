import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router';

export default function AdmineRoute({component :Component , ...rest}) {

    const studentLogin = useSelector(state => state.studentLogin);

    const { studentInfo } = studentLogin;
    return (
        <Route {...rest}  render ={(props) => studentInfo  && studentInfo.cr? (<Component {...props} ></Component>):
        (
            <Redirect to="/signup" />
        )
        
        }></Route> 
    )
}
