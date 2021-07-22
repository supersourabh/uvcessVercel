import React, { lazy, Suspense, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { materialAction } from '../Actions/AllActions';
import Alerts from '../HomeComponents/Alerts';
import Loading from '../HomeComponents/Loading';
import LazyLoad from "react-lazyload"
import SubjectsMaterial from '../HomeComponents/SubjectsMaterial';

//const SubjectsMaterial = lazy(()=>import ("../HomeComponents/SubjectsMaterial") );

export default function SubjectScreen(props) {
    const [sem, setSem] = useState(1)
    const [data, setData] = useState(null)
    const [src, setSrc] = useState()

    const material = useSelector(state => state.material);

    const { materialInfo, error, success, loading } = material;

    const studentLogin = useSelector(state => state.studentLogin)

    const { studentInfo } = studentLogin;


    const dispatch = useDispatch()

    const showHandler = (e) => {
        dispatch(materialAction(sem, studentInfo.branch, 1))
    }

    function imageSrc(item) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(item.doc.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    const download = async (id, e) => {
        console.log("click done");
        await fetch(`http://localhost:5000/api/material/view/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${studentInfo.token}`,
            }
        }
        ).then((res) => setData(res))
        console.log(data)
        setSrc(`data:${data.doc.contentType};base64,${imageSrc(data)}`)





    }


    return (
        <div className="sem">
            <select value={ sem } onChange={ (e) => setSem(e.target.value) }>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
            </select>
            <button type="button" style={ { margin: 20 } } className="btn btn-info" onClick={ showHandler }>GET</button>

            <ul >
                {
                    loading ? <Loading /> :
                        error ? <Alerts info="danger" message={ error } /> : (
                            materialInfo.length === 0 ?
                                <li>
                                    <div><h4>No Material , Sorry ...!(click GET)</h4></div>
                                </li> :
                                materialInfo.map(item =>

                                    <li key={ item._id }>
                                        <div>
                                            <h6>Name of Subject:</h6> <b>{ item.subject }</b>
                                        </div>
                                        <div>
                                            <h6>Professor:</h6><b>{ item.professor }</b>
                                        </div>
                                        <div>
                                            <h6>Date : </h6><b>{ item.data } </b>
                                        </div>
                                        <div style={ { flexDirection: "row" } }>

                                            <button type="button" className="btn btn-success" onClick={ (e) => props.history.push(`/material/download/${item._id}/subjectScreen`) }>Download</button>

                                            <button style={ { marginLeft: 10 } } type="button" className="btn btn-warning" onClick={ (e) => props.history.push(`/material/view/${item._id}`) }>View</button>

                                        </div>
                                    </li>
                                )



                        ) }
            </ul>


        </div>
    )
}
