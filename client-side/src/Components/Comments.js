import React, { useEffect, useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom"
import "../review.css";
import bgimage from '../photo-1.png';
import {Button} from "react-bootstrap";

export default function Comments() {

    let { id } = useParams();
    const [approvedProject, setApprovedProject] = useState();
    const [comment, setComment] = useState('');
    const divRref = useRef(null);

    useEffect(() => {
        fetch(`http://localhost:4000/approved-projects/${id}`)
            .then(response => response.json())
            .then(json => {
                setApprovedProject(json.data);
                divRref.current.scrollIntoView({ behavior: 'smooth' });
            })
    }, [id]);

    function addComment() {
        fetch(`http://localhost:4000/approved-projects/Comments/${id}`,
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    comment: comment
                })
            }
        ).then((response) => response.json()).then(data => {
            if (data.message === undefined) {
                setComment('');
                fetch(`http://localhost:4000/approved-projects/${id}`)
                    .then(response => response.json())
                    .then(json => {
                        setApprovedProject(json.data);
                        divRref.current.scrollIntoView({ behavior: 'smooth' });
                    });

            } else {
                alert("Our spam detector, detected inapproriate text, if you think this is wrong please contact us");
            }
        });

    }

    return (
        <div>
        <div className="container">   
        <div className="mx-auto" style={{ width: '60' }}>
            <div className="jumbotron" style={{ backgroundImage: `url(${bgimage})`, backgroundSize:'cover',height:"500px" }}>
                <h1 style={{color:"white"}}>My Community Project</h1>
                <br></br>
                <p style={{color:"white"}}>My Community Project is all about local ideas, local projects and local decisions.</p>
                <br></br>
            </div>
              <div>
                
                    {
                        approvedProject && (
                            <div key={approvedProject.id}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title><strong>Title: </strong>{approvedProject.details.title} </Card.Title>
                                        <Card.Text className="mt-4">
                                            <strong>Description: </strong>{approvedProject.details.description}
                                        </Card.Text>

                                    </Card.Body>
                                </Card>
                            </div>)
                    }
                </div>
                <div className="mx-auto" style={{ 'overflow-y': 'scroll', height: '400px' }}>
                    {
                        approvedProject && (
                            <div className="commentsContainer">
                                {approvedProject.comments && approvedProject.comments.map(comment =>
                                    <div className="alert alert-dark" >{comment}</div>
                                )}
                            </div>
                        )
                    }
                    <div ref={divRref} />
                </div>
                <div class="input-group commentsContainer">
                    <textarea maxLength="50" value={comment} onChange={(event) => setComment(event.target.value)} class="form-control" placeholder="Please add your comment here!!" aria-label="With textarea"></textarea>
                    <div class="input-group-prepend">
                        <Button variant="danger" onClick={() => addComment()} class="input-group-text">Add Comment</Button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}