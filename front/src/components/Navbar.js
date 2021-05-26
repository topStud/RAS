import '../style/Navbar.css';
import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function AppMenu() {
    let active_1 = false
    let active_2 = false
    let active_3 = false

    const home = ''
    const privatePage = 'privatePage'
    const log = 'logIn'

    const relative_path = window.location.href.replace(/^(?:\/\/|[^/]+)*\//, '')
    if (relative_path === home) {
        active_1 = true
    } else if(relative_path === privatePage) {
        active_2 = true
    } else if(relative_path === log) {
        active_3 = true
    }

    return(
        <Navbar bg="dark" variant="dark" className={'nav-header'}>
            <Navbar.Brand href="/">RAS <small>Researcher’s Auxiliary System</small></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link active={active_1} href='/'>Home</Nav.Link>
                <Nav.Link active={active_2} href='/privatePage'>Private Area</Nav.Link>
                <Nav.Link active={active_3} href='/logIn'>Log In</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default AppMenu
