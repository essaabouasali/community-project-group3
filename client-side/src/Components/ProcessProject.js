import React,{useState , useEffect} from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Card from "react-bootstrap/Card";
import bgimage from '../photo-3.png';
import "../review.css";


export default function ProcessProject()
{
    const[view,setview]=useState(0);
    const [searchItem,setSearchItem]=useState("");
    const [status,setStatus]=useState("Pending");
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


    function sendSwitchRequest(canVote)
    {   
        
        fetch("http://localhost:4000/public-can-vote",{
            method:"PUT",
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(json =>{
            if(json.status === 200)
            {
                setCanVote(json.data.canVote);
            }
            else
            {
                alert(json.error);
            }
        })
    }
    const views=[<Pending searchItem={searchItem} />,<Approved searchItem={searchItem}/>,<Rejected searchItem={searchItem}/>];
    return(
        <div>
            <div className="jumbotron" style={{ backgroundImage: `url(${bgimage})`, backgroundSize:'cover',height:"100%" }}>
                <h1>My Community Project</h1>
                <br></br>
                <p>My Community Project is all about local ideas, local projects and local decisions.</p>
                <br></br>
                <InputGroup className="mb-2">
                    <InputGroup className="mb-2">
                        <InputGroup.Prepend>
                        <InputGroup.Checkbox aria-label="Public Can Vote" checked={canVote} onClick={()=>{sendSwitchRequest(canVote)}} />
                        </InputGroup.Prepend>
                        <InputGroup.Text className="ml-1">Public Can Vote</InputGroup.Text>
                    </InputGroup>
                    <DropdownButton
                        as={InputGroup.Prepend}
                        variant="primary"
                        title={status}
                        id="input-group-dropdown-1"
                        >
                        <Dropdown.Item active={status === "Rejected"} onClick={()=>{setview(2); setStatus("Rejected");}}>Rejected</Dropdown.Item>
                        <Dropdown.Item active={status === "Approved"} onClick={()=>{setview(1); setStatus("Approved");}}>Approved</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item active={status === "Pending"} onClick={()=>{setview(0); setStatus("Pending");}}>Pendding</Dropdown.Item>
                    </DropdownButton>
                    <textarea value={searchItem} onChange={(e)=>{setSearchItem(e.target.value)}} class="form-control" placeholder="Search" aria-label="With textarea"></textarea>
                </InputGroup>
                {views[view]}
            </div>
        </div>
    );
}

function Pending(props)
{
    const searchTerm= props.searchItem;
    const [projects,setprojects]=useState([]);
    let canvote = props.canvote;
    useEffect(()=>{
        fetch("http://localhost:4000/projects/pending",{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({searchTerm})
        })
        .then(response => response.json())
        .then(json =>{
            if(json.status === 200)
            {
                setprojects(json.data);
            }else{
                alert(json.message);
            }
        })
    },[searchTerm])

    function sendApproveRequest(id)
    {
        
        fetch("http://localhost:4000/projects",{
            method:"PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id,status:"approved"})
        })
        .then(response => response.json())
        .then(json =>{
            if(json.status === 200)
            {
                alert("this project has been approved");
                window.location.href=`/viewProjects/${canvote}`;
            }else{
                alert(json.message);
            }
        })

    }
    function sendRejectRequest(id)
    {
    
        fetch("http://localhost:4000/projects",{
            method:"PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id,status:"rejected"})
        })
        .then(response => response.json())
        .then(json =>{
            if(json.status === 200)
            {
                alert("this project has been rejected");
            }else{
                alert(json.message);
            }
        })

    }
    return(
        <div className="review-projects-disply">
            {projects && projects.map(p =>{
                return(
                <div key={p.id}>
                    <Card style={{ width: '18rem', margin: "10px" }}>
                        <Card.Body>
                            <Card.Title><strong>Title: </strong>{p.value.title}</Card.Title>
                            <Card.Text className="mt-4">
                                <strong>Description: </strong>{p.value.description} 
                            </Card.Text>
                            <Card.Text  className="mt-4">
                                <strong>Status: </strong> {p.value.status}
                            </Card.Text>
                            <Button onClick={()=>{sendApproveRequest(p.id);}} variant="primary">approve</Button>
                            <Button onClick={()=>{sendRejectRequest(p.id);}} className="ml-4"  variant="primary">reject</Button>
                        </Card.Body>
                    </Card>
                </div>
                );
            })}
        </div>
    );
}

function Approved(props)
{
    const searchTerm= props.searchItem;
    const [projects,setprojects]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:4000/projects/approved",{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({searchTerm})
        })
        .then(response => response.json())
        .then(json =>{
            if(json.status === 200)
            {
                setprojects(json.data);
            }else{
                alert(json.message);
            }
        })
    },[searchTerm]);
    return(
        <div className="review-projects-disply">
            {projects && projects.map(p =>{
                return(
                <Card key={p.id} style={{ width: '18rem', margin: "10px" }}>
                    <Card.Body>
                        <Card.Title><strong>Title: </strong>{p.value.title}</Card.Title>
                        <Card.Text className="mt-4">
                            <strong>Description: </strong>{p.value.description} 
                        </Card.Text>
                        <Card.Text  className="mt-4">
                            <strong>Status: </strong> {p.value.status}
                        </Card.Text>
                        <Button onClick={()=>{window.location.href=`/deleteComment/${p.id}`}} variant="danger">View Comments</Button>
                    </Card.Body>
                </Card>
                );
            })}
        </div>
    );
}

function Rejected(props)
{
    const searchTerm= props.searchItem;
    const [projects,setprojects]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:4000/projects/rejected",{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({searchTerm})
        })
        .then(response => response.json())
        .then(json =>{
            if(json.status === 200)
            {
                setprojects(json.data);
            }else{
                alert(json.message);
            }
        })
    },[searchTerm]);
    return(
        <div className="review-projects-disply">
            {projects && projects.map(p =>{
                return(
                <Card key={p.id} style={{ width: '18rem', margin: "10px" }}>
                    <Card.Body>
                        <Card.Title><strong>Title: </strong>{p.value.title}</Card.Title>
                        <Card.Text className="mt-4">
                            <strong>Description: </strong>{p.value.description} 
                        </Card.Text>
                        <Card.Text  className="mt-4">
                            <strong>Status: </strong> {p.value.status}
                        </Card.Text>
                    </Card.Body>
                </Card>
                );
            })}
        </div>
    );
}