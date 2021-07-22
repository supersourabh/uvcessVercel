import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { viewAction } from '../Actions/AllActions';
import Alerts from '../HomeComponents/Alerts';
import Loading from '../HomeComponents/Loading';

export default function DownloadScreen(props) {

    const id = props.match.params.id
    const screen = props.match.params.screen

    function imageSrc(item) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(item.doc.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    const dispatch = useDispatch()

    const view = useSelector(state => state.view)
    const { viewInfo: item, loading, error } = view;



    useEffect(() => {

        dispatch(viewAction(id))

    }, [dispatch, id])



    return (
        <div className="view">

            {
                loading ? <Loading /> :
                    error ? <Alerts info="danger" message={ error } /> :
                        item &&
                        <div style={{display : "flex" , flexDirection : "column" , height : 200}}>
                            <div style={{paddingBottom : 50}}><b>Info </b>:{screen==="subjectScreen"?item.subject: `${item.type}    ,   ${item.subject}`}</div>
                            <a href={ `data:${item.doc.contentType};base64,${imageSrc(item)}` } download={ screen === "subjectScreen" ? `${item.subject}-${item.professor}.pdf` : screen === "syllabusScreen" ? `${item.type}-${item.subject}.pdf` : `${item.type}-${item.subject}.pdf` } style={ { width: 300 } } className="btn btn-success" > Download </a>
                        </div>
            }

        </div>
    )
}
