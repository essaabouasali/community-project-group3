import React from 'react';
import bgimage from '../photo-5.png';
import {Jumbotron} from 'react-bootstrap';


export default function Main(){
    return(
        <div>
            <Jumbotron style={{ backgroundImage: `url(${bgimage})`,backgroundPositionY:"translateY(-100px)", backgroundSize:'cover',height:"500px"}}>
                <h1>My Community Project</h1>
                <br></br>
                <p>       My Community Project is all about local ideas, local projects and local decisions.          </p>
                <br></br>
            </Jumbotron>
            <div style={{margin: "30px"}}>
                <h3 className="text-primary">Latest Successful projects</h3>
                <p>Find out about other current our Community projects and plans. These plans and projects are being developed to improve and enhance activities and facilities in NSW.
                These plans consist of a mix NSW owned projects and projects where The service is partnering with the NSW Government. The All of Government Communications Framework 
                encapsulates our commitment to work together across government so that we can deliver first class communications to NSW citizens. This can be achieved by putting our customers at the centre of our 
                communications. The Framework defines our way of working to improve the effectiveness and impact of our communications through three strategic pillars.</p>
                <p>The All of Government Communications Framework encapsulates our commitment to work together across government so that we can deliver first class communications
                 to NSW citizens. This can be achieved by putting our customers at the centre of our communications. The Framework defines our way of working to improve the effectiveness
                and impact of our communications through three strategic pillars.</p>
            </div>
            <div style={{margin: "30px"}}>
                <button style={{width:"200px"}} type="button" onClick={()=>{window.location.href="/addProject"}} className="btn btn-danger">Submit an idea</button>
            </div>
            <div style={{margin: "30px"}}>
                <button style={{width:"200px"}} type="button" onClick={()=>{window.location.href="/viewProjects"}} className="btn btn-danger">Browse Projects</button>
            </div>
        </div>
    );
}
