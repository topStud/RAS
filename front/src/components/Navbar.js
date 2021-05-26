import '../style/Navbar.css';
import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function AppMenu() {
    const [active_1, setActive_1] = React.useState(false)
    const [active_2, setActive_2] = React.useState(false)
    const [active_3, setActive_3] = React.useState(false)

    const home = '/'
    const privatePage = '/privatePage'
    const log = '/logIn'
    const relative_path = window.location.href.replace(/^(?:\/\/|[^/]+)*\//, '')
    // console.log(window.location.href.replace(/^(?:\/\/|[^/]+)*\//, ''))
    // if (relative_path === home) {
    //     setActive_1(true)
    // } else if(relative_path === privatePage) {
    //     setActive_2(true)
    // } else if(relative_path === log) {
    //     setActive_3(true)
    // }

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
