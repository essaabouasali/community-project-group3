import React, { useEffect, useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom"
import "../review.css";
import bgimage from '../photo-1.png';
// import {Button} from "react-bootstrap";
import Toast from "react-bootstrap/Toast";

export default function Comments() {

    let { id } = useParams();
    const [approvedProject, setApprovedProject] = useState();
    const divRref = useRef(null);

    useEffect(() => {
        fetch(`http://localhost:4000/approved-projects/${id}`)
            .then(response => response.json())
            .then(json => {
                setApprovedProject(json.data);
                divRref.current.scrollIntoView({ behavior: 'smooth' });
            })
    }, [id]);

    function deleteComment(currcomment) {
                
        fetch(`http://localhost:4000/approved-projects/delete-comment/${id}`,
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    comment: currcomment
                })
            }
        ).then(response => response.json())
        .then(json =>{
            if(json.status === 200)
            {
                fetch(`http://localhost:4000/approved-projects/${id}`)
                    .then(response => response.json())
                    .then(json => {
                        setApprovedProject(json.data);
                        divRref.current.scrollIntoView({ behavior: 'smooth' });
                    });
            }else
            {
                alert(json.message);
            }
        })
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
                                    <Toast onClose={()=>{deleteComment(comment)}} >
                                    <Toast.Header>
                                      <img
                                        src="holder.js/20x20?text=%20"
                                        className="rounded mr-2"
                                        alt=""
                                      />
                                      <strong className="mr-auto">Comment</strong>
                                    </Toast.Header>
                                    <Toast.Body>{comment}</Toast.Body>
                                  </Toast>
                                )}
                            </div>
                        )
                    }
                    <div ref={divRref} />
                </div>
            </div>
        </div>
        </div>
    )
}