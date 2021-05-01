import '../style/Navbar.css';
import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function AppMenu() {
    return(
        <Navbar bg="dark" variant="dark" className={'nav-header'}>
            <Navbar.Brand href="#home">RAS <small>Researcher’s Auxiliary System</small></Navbar.Brand>
            <Nav className="mr-auto" defaultActiveKey="#home">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Private Area</Nav.Link>
                <Nav.Link href="#pricing">Log In</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default AppMenu
