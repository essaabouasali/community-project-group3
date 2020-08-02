import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
export default function Confirmation()
{   
    let {id} = useParams();
    const[project,setproject]=useState();
    useEffect(()=>{
        fetch(`http://localhost:4000/projects/${id}`)
        .then(response => response.json())
        .then(json => {
            if(json.status===200)
            {
                setproject(json.data);
            }else{
                alert(json.message);
            }
        });
    },[id]);
    return(
        <div>
            {project !== undefined &&
            <Jumbotron>
                <h5>Thanks for sharing your thoughts, we will get back to you soon </h5>
                <p>Thanks <span>{project.value.nameofsubmitter}</span> for submitting you community project <span>{project && project.value.title}</span> will get in tougch with you soon</p>
                <p><strong>Project Description : </strong> {project && project.value.description}</p>
                <p><strong>Date: </strong> {project && project.value.todayDate}</p>
                <p><strong>status: </strong> {project && project.value.status}</p>
                <Button variant="success" onClick={()=> window.location.href="/"}>Done</Button>
            </Jumbotron>
             }
        </div>
    );
}