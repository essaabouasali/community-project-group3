import React, {useEffect, useState} from "react"
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../review.css";
import bgimage from '../photo-1.png';


export default function ViewEligibleProgicts()
{
    
    const[projects,setprojects]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:4000/approved-projects")
        .then(response => response.json())
        .then(json =>{
            if(json.status === 200)
            {
                setprojects(json.data);
            }
            else{
                alert(json.message);
            }
        })
    },[projects])
    return(
        <div>
            <div className="jumbotron" style={{ backgroundImage: `url(${bgimage})`, backgroundSize:'cover',height:"100%" }}>
                <h1 style={{color:"white"}}>My Community Project</h1>
                <br></br>
                <p style={{color:"white"}}>My Community Project is all about local ideas, local projects and local decisions.</p>
                <br></br>
                <div style={{display:"flex" , flexWrap:"wrap"}}>
                {projects && projects.map(p => <ViewProject key={p.id} p={p}/>)}
            </div>
            </div>
        </div>
    );
};

function ViewProject(props)
{
    const[canVote,setCanVote]=useState();
    useEffect(()=>{
        fetch("http://localhost:4000/public-can-vote")
        .then(response => response.json())
        .then(json =>{
            if(json.status === 200)
            {
                setCanVote(json.data.canVote);
            }
            else{
                alert("error fetching vote data from the server");
            }
        })
    },[canVote]);
    
    function sendVoteRequest(e)
    {
        e.preventDefault();
        fetch(`http://localhost:4000/approved-projects/${props.p.id}`,{
            method:"PUT",
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(json =>{
            if(json.status === 200)
            {
                alert("you have voted");
            }
            else{
                alert(json.message);
            }
        })
    }
    return(
        <div>
            
            <Card style={{ width: '18rem', margin: "10px" }}>
                    <Card.Body>
                        <Card.Title><strong>Title: </strong>{props.p.details.title}</Card.Title>
                        <Card.Text className="mt-4">
                            <strong>Description: </strong>{props.p.details.description} 
                        </Card.Text>
                        <Card.Text  className="mt-4">
                            <strong>Status: </strong> {props.p.details.status}
                        </Card.Text>
                        <Card.Text>
                            <strong>Time updated: </strong> {props.p.timeUpdated}
                        </Card.Text>
                        <Card.Text>
                            <strong>Votes: </strong> {props.p.votes}
                        </Card.Text>
                        { canVote > 0 && <Button variant="success" onClick={sendVoteRequest}>Vote</Button> }
                        <Button style={{display:"block" , marginTop:"5px"}} variant="danger" onClick={()=>{window.location.href=`/comment/${props.p.id}`}} >Comments</Button>
                    </Card.Body>
            </Card>
        </div>
    );
}