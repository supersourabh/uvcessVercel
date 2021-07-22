import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../HomeComponents/Loading';
import Alerts from '../HomeComponents/Alerts';
import { crsAction } from '../Actions/AllActions';

export default function CrsListScreen() {

    const crs = useSelector(state => state.crs);
    const{crsList, loading ,error}=crs;

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(crsAction())
    }, [dispatch])

    return (
        <div className="sem">
            <ul>
                <h2 style={{color:"green" , textAlign:"center" , textDecoration:"underline"}}>Class-Representative's</h2>
                {
                    loading?<Loading/>:
                    error? <Alerts info="danger" message={error}/> :
                    crsList.length===0?
                    <li>
                        <div><h4>No crs fond, Sorry ...!</h4></div>
                    </li>:
                    crsList.map(cr=>
                    <li>
                        <div><h6>Name : </h6><b>{cr.name}</b></div>
                        <div><h6>Sem : </h6><b>{cr.sem}</b></div>
                        <div><h6>Contact :</h6><b>{cr.contact}</b></div>
                    </li>
                    )
                    

                    
                }
                
            </ul>
            
        </div>
    )
}
