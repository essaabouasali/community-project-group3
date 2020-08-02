import React from "react";
import {useRouteMatch} from "react-router-dom";
import {useState}from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button"
import '../submitForm.css';
import bgimage from '../photo-3.png';
export default function ProjectSubmition()
{
   const [nameofsubmitter,setNameofsubmitter]= useState("");
   const[postcode,setPostcode]= useState("");
   const[projectName,setprojectName]= useState("");
   const[description,setdDescription]= useState("");
   // eslint-disable-next-line no-unused-vars
   let { path, url } = useRouteMatch(); 

    function sendRequest(e)
    {
        e.preventDefault();

        let project={nameofsubmitter,postcode,title:projectName,description,email:"sample@sample.com"};

        fetch('http://localhost:4000/projects',{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
        }).then(response => response.json())
        .then(json =>{
            if(json.status === 200)
            {
                window.location.href = `/addProject/Confirmation/${json.data.id}`
            }
            else{
                alert(json.message);
            }
        })
    }

    return(
        <div>
            <div className="jumbotron" style={{ backgroundImage: `url(${bgimage})`, backgroundSize:'cover',height:"100%" }}>
                <h1>My Community Project</h1>
                <br></br>
                <p>       My Community Project is all about local ideas, local projects and local decisions.          </p>
                <br></br>
                <div className="submit-form">
                <Form>
                    <Row className="mt-3">
                    <Col>
                        <label className="text-primary"> Name of submitter *</label>
                        <Form.Control value={nameofsubmitter} onChange={(event) =>setNameofsubmitter (event.target.value)} required />
                    </Col>
                    <Col>
                    <label className="text-primary"> Post code *</label>
                        <Form.Control value={postcode} onChange={(event) => setPostcode(event.target.value)} required />
                    </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <label className="text-primary">PROJECT Name *</label>
                            <Form.Control type="text"  value={projectName} onChange={(event)=>{setprojectName(event.target.value)}} required />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <label className="text-primary">PROJECT Description *</label>
                            <Form.Control as="textarea" maxLength="300" rows="3" placeholder="please enter description for your project (max 500 characters)"  value={description} onChange={(event)=>{setdDescription(event.target.value)}} required />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <Button variant="primary" type="submit" onClick={sendRequest} className="btn btn-danger">Submit</Button>
                        </Col>
                    </Row>
                </Form>      
            </div> 
            </div>
                
        </div>
    );
}