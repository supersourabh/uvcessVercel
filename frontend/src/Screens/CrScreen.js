import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { materialUploadAction } from '../Actions/AllActions';
import Alerts from '../HomeComponents/Alerts';
import Loading from '../HomeComponents/Loading';


export default function CrScreen(props) {
    const [subName, setSubName] = useState()
    const [branch, setBranch] = useState("Mechanical")
    const [sem, setSem] = useState(1)
    const [file, setFile] = useState()
    const [nameProf, setNameProf] = useState()

    const dispatch = useDispatch()

    const materialUpload = useSelector(state => state.materialUpload)
    const { loading, error, success } = materialUpload;


    const formData = new FormData();
    formData.append("subName", subName)
    formData.append("branch", branch)
    formData.append("sem", sem)
    formData.append("file", file)
    formData.append("nameProf", nameProf)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(materialUploadAction(formData))
    }







    return (
        <div className="register"  style={{ backgroundImage: `linear-gradient(100deg, #9c754d,#fff`, }}  >

            <form onSubmit={ submitHandler } method="POST" encType="multipart/form-data">
                <ul>
                    <li>
                        <h2>Material Upload</h2>
                    </li>
                    {
                        loading ? <Loading /> :
                            error ? <Alerts info="danger" message={ error } /> :
                                success && <Alerts info="success" message={ success } />
                    }
                    <li>
                        <label htmlFor="Branch" > Branch : </label>
                        <select value={ branch } required onChange={ (e) => setBranch(e.target.value) }>
                            <option value="Mechanical">Mechanical</option>
                            <option value="Computer-Science">Computer-Science</option>
                            <option value="Civil">Civil</option>
                            <option value="Electrical">Electrical-</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Information Science">Information Science</option>
                        </select>
                    </li>
                    <li>
                        <label htmlFor="subname"> Subject Name : </label>
                        <input type="text" required placeholder="Enter Name" value={ subName } onChange={ (e) => setSubName(e.target.value) } />
                    </li>
                    <li>
                        <label htmlFor="professor"> Professor Name : </label>
                        <input type="text" required placeholder="Enter Name of Professor" value={ nameProf } onChange={ (e) => setNameProf(e.target.value) } />
                    </li>
                    <li>
                        <label htmlFor="sem"> Sem : </label>
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
                    </li>
                    <li>
                        <Form.Group>
                            <Form.File name="file" required accept="application/pdf" id="exampleFormControlFile1" label="Pdf/docs" onChange={ (e) => setFile(e.target.files[0]) } />
                        </Form.Group>
                    </li>

                    <li>
                        <button type="submit" className="btn btn-success">Upload</button>
                    </li>


                </ul>
            </form>

        </div>
    )
}
