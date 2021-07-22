import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { problemsAction } from '../Actions/AllActions'
import Loading from "../HomeComponents/Loading"
import Alerts from "../HomeComponents/Alerts"


export default function ProblemsScreen() {
    const [problem, setProblem] = useState()
    const [about, setAbout] = useState()

    const dispatch = useDispatch()

    const studentLogin = useSelector(state => state.studentLogin)
    const{studentInfo} = studentLogin;

    const problems = useSelector(state => state.problems)
    const{loading ,error ,success , problemInfo} = problems;

    const rollNo = studentInfo.rollNo

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(problemsAction({about , problem , rollNo}))
        
    }

    return (
        <div className="problems" >
            {
                loading?<Loading/>:
                error?<Alerts info="danger" message={error}/>:
                success?
                <>
                <Alerts info='success' message={"Problem saved successfully"}/>
                <div className='problemsInfo'>
                    <h5>About : </h5><b> {problemInfo.problem}</b>
                </div>
                <div className='problemsInfo'>
                    <h5>Statement :</h5> <b> {problemInfo.statement}</b>
                </div>
                </>
                :

                <Form onSubmit={submitHandler}>
                    <Form.Label style={{width:"100%" , textAlign:"center" , color:"#c37878" ,fontWeight:"bold", fontSize:50}}>Problem</Form.Label>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label style={{color :"#c6c3ff"}}>About</Form.Label>
                        <Form.Control  type="text" placeholder="Small intro of problem" onChange={(e)=>setAbout(e.target.value)}/>
                    </Form.Group>
                    
                    <Form.Group controlId="Problem">
                        <Form.Label style={{color :"#c6c3ff"}} >Problem</Form.Label>
                        <Form.Control as="textarea" placeholder="Full statement of problem" onChange={(e)=>setProblem(e.target.value)} rows={3} />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </Form>
            }
             
            
        </div>
    )
}
