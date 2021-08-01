import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { syllabusUploadAction } from '../Actions/AllActions'
import Alerts from '../HomeComponents/Alerts'
import Loading from '../HomeComponents/Loading'

export default function ExamRelatesUploadScreen() {
    const [branch, setBranch] = useState("Mechanical")
    const [sem, setSem] = useState(1)
    const [timetable, setTimetable] = useState("Question-Paper")
    const [subject, setSubject] = useState()
    const [file, setFile] = useState();

    const dispatch = useDispatch()

    const syllabusUpload = useSelector(state => state.syllabusUpload)
    const{loading ,error,success}=syllabusUpload;

    useEffect(() => {
        
        if(success){

            window.location.reload(false);
            alert("Done")
        }

    }, [success])

    const formData = new FormData();
    formData.append("type" , timetable)
    formData.append("sem" , sem)
    formData.append("subject" , subject)
    formData.append("branch" , branch)
    formData.append("file" , file)



    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(syllabusUploadAction(formData))
    }


    return (
        <div className="register"  style={{ backgroundImage: `linear-gradient(126deg, #907ad2,#bcc7a8`, }}>
             <form onSubmit={(e)=>submitHandler(e)} method="POST" encType ="multipart/form-data">
                <ul>
                    <li>
                        <h2>QP's/Results </h2>
                    </li>
                    {
                        loading?<Loading/>:
                        error?<Alerts info="danger" message={error}/>:
                        success && <Alerts info="success" message="Syllabus upload success"/>
                    }
                    <li>
                        <label htmlFor="Branch" > Branch : </label>
                        <select value={branch} required onChange={(e)=>setBranch(e.target.value)}>
                            <option value="Mechanical">Mechanical</option>
                            <option value="Computer-Science">Computer-Science</option>
                            <option value="Civil">Civil</option>
                            <option value="Electrical">Electrical-</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Information Science">Information Science</option>
                        </select>
                    </li>
                    <li>
                        <label htmlFor="subname"> Sem : </label>
                        <select value={sem} onChange={(e)=>setSem(e.target.value)}>
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
                        <label htmlFor="choice"> Syllabus/Timetable : </label>
                        <select value={timetable} onChange={(e)=>setTimetable(e.target.value)}>
                            <option value="Question-Paper">Question-Paper</option>
                            <option value="Results">Results</option>
                        </select>
                    </li>
                    <li>
                        <label htmlFor="subject"> Subject( year-sem ) : </label>
                        <input type="text" onChange={(e)=>setSubject(e.target.value)} />
                    </li>
                   
                    <li>
                        <Form.Group>
                            <Form.File name="file" required accept="application/pdf" id="exampleFormControlFile1"  label="Pdf/docs"  onChange={(e)=>setFile(e.target.files[0])}/>
                        </Form.Group>
                    </li>
                    
                    <li>
                        <button type="submit"  className="btn btn-warning">Upload</button>
                    </li>

                </ul>
            </form>
        </div>
    )
}
