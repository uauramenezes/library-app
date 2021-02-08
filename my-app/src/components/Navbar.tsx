import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavItems() {
    let width = window.innerWidth;

    if (width < 450) {
        return(
            <NavDropdown title="Library App" id="basic-nav-dropdown" className='drop-down'>
                <NavDropdown.Item href="/">Home</NavDropdown.Item>
                <NavDropdown.Item href="/">Subjects</NavDropdown.Item>
                <NavDropdown.Item href="/">My Library</NavDropdown.Item>
            </NavDropdown>
        )
    } else {
        return(
            <React.Fragment>
                <Navbar.Brand href="/" className='site-title'>Library App</Navbar.Brand>
                <Nav className="mr-auto" id='nav'>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#about">Subjects</Nav.Link>
                    <Nav.Link href="#library">My Library</Nav.Link>
                </Nav>
            </React.Fragment>
        )
    }
}

export default function NavBar() {
    return(
        <Navbar bg="dark" variant="dark">
            <NavItems />
            <Form inline>
                <Button variant="outline-info" className='mr-sm-2 button' href="/sign-in">
                    Sign In
                </Button>
                <Button variant="outline-info" className='button' href='sign-up'>Sign Up</Button>
            </Form>
        </Navbar>
    )
}