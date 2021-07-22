import React from 'react';
import {Spinner } from "react-bootstrap";

export default function Loading() {
    return (
        <div style={{width:"100%",textAlign : "center" }}>
            <Spinner  animation="border" role="status" variant="success">
                <span  className="sr-only">Loading...</span>
            </Spinner>
        </div>
        
    )
}
