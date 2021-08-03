import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { viewAction } from '../Actions/AllActions';
import Alerts from '../HomeComponents/Alerts';
import Loading from '../HomeComponents/Loading';

export default function ViewScreen(props) {
    
    const id = props.match.params.id

    function imageSrc(item){
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(item.doc.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    const dispatch = useDispatch()

    const view = useSelector(state => state.view)
    const{viewInfo:item , loading , error}=view;



    useEffect(() => {
        
        dispatch(viewAction(id))

    }, [dispatch, id])



    return (
        <div className="view">
            {
                loading?<Loading/>:
                error?<Alerts info="danger" message={" Not Found !!!"}/>:
                item&&
                <embed src={`data:${item.doc.contentType};base64,${imageSrc(item)}`} type={item.doc.contentType} width="100%" height="100%" />
            }

        </div>
    )
}
