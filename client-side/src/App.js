import React from 'react';

import ProjectSubmition from "./Components/ProjectSubmition";
import MainPage from "./Components/MainPage";
import Confirmation from "./Components/Confirmation";
import ProcessProject from "./Components/ProcessProject";
import ViewEligibleProjects from "./Components/ViewEligibleProjects";
import Comments from "./Components/Comments";
import DeleteComment from "./Components/DeleteComment"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";
  import "./social.css"
export default function App() {
 
  return (
    <div>
      <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/"><img src="https://www.service.nsw.gov.au/themes/snsw_theme/images/servicensw-logo.png" height="30" alt="React Bootstrap logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/addProject">Submit an idea</Nav.Link>
                    <Nav.Link href= {`/viewProjects`} >Browse Projects</Nav.Link>
                    </Nav>
                    <Form inline>
                    <Button onClick={()=>{window.location.href="/reviewProjects"}} variant="outline-success">Admin Login</Button>
                    </Form>
                </Navbar.Collapse>
      </Navbar>
      <Router>
        <Switch>
          <Route path="/addProject/Confirmation/:id">
            <Confirmation/>
          </Route>
          <Route exact path="/">
            <MainPage/>
          </Route>
          <Route path="/addProject">
            <ProjectSubmition/>
          </Route>
          <Route path="/reviewProjects">
            <ProcessProject/>
          </Route>
          <Route path="/viewProjects">
            <ViewEligibleProjects/>
          </Route>
          <Route path="/comment/:id">
            <Comments/>
          </Route>
          <Route path="/deleteComment/:id">
            <DeleteComment/>
          </Route>
        </Switch>
      </Router>
      <Jumbotron fluid>
                <Container>
                    <div className="social-container">
                        <h1>CONTACT US</h1>
                        <p><a href="https://www.service.nsw.gov.au/contact-us">Contact form</a></p>
                        <p><a href="https://www.service.nsw.gov.au/contact-us">Phone 13 77 88</a></p>
                        <p><a href="https://www.service.nsw.gov.au/service-centre">Find a Service NSW location</a></p>
                        <h3>Social Follow</h3>
                        <a href="https://www.youtube.com/channel/UCpFpdQqKphbZ5xiLV0nuwdQ"
                             className="youtube social">
                            <FontAwesomeIcon icon={faYoutube} size="4x" />
                        </a>
                        <a href="https://www.facebook.com/ServiceNSW/"
                            className="facebook social">
                            <FontAwesomeIcon icon={faFacebook} size="4x" />
                        </a>
                        <a href="https://twitter.com/ServiceNSW" className="twitter social">
                            <FontAwesomeIcon icon={faTwitter} size="4x" />
                        </a>
                        <a href="https://www.instagram.com/accounts/login/?next=/servicensw/%3Fref%3Dbadge"
                            className="instagram social">
                            <FontAwesomeIcon icon={faInstagram} size="4x" />
                        </a>
                    </div>
                </Container>
      </Jumbotron>
    </div>
  );
}


