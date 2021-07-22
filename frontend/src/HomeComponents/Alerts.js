import React from 'react'
import { Alert } from 'react-bootstrap'

export default function Alerts(props) {
    const{info , message}=props;
    return (
        <div style={{overflowY :"scroll" , width:"auto" ,height:50}}>
            <Alert style={{overflow : "hidden"}} variant={`${info}`}>{info==="danger"?"Error" :"Message"} : {message}</Alert>
        </div>
    )
}
