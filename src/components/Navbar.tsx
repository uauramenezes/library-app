import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useCookies } from 'react-cookie';

function NavButtons() {
  const [cookie, , removeCookie] = useCookies(["user"]);

  if (cookie.user) {
    return (
      <Form inline>
        <Button variant="outline-info"
        className='button'
        href={`${process.env.PUBLIC_URL}/`}
        onClick={() =>{removeCookie('user', {
          path: '/',
          sameSite: 'strict'
        })}}
        >
          Sign Out
        </Button>
      </Form>
    )
  } else {
    return(
      <Form inline>
        <Button variant="outline-info" className='mr-sm-2 button' href="sign-in">
          Sign In
        </Button>
        <Button variant="outline-info" className='button' href='sign-up'>
          Sign Up
        </Button>
      </Form>
    )
  }
}

function NavItems() {
  const [cookie] = useCookies(["user"]);

  let accountPath:string;

  if (cookie.user) {
    accountPath = 'account';
  } else {
    accountPath = 'sign-in'
  }

  let width = window.innerWidth;
  let url = `${process.env.PUBLIC_URL}/`;

  if (width < 450) {
    return (
      <NavDropdown title="Library App" id="basic-nav-dropdown" className='drop-down'>
        <NavDropdown.Item href={url}>Home</NavDropdown.Item>
        <NavDropdown.Item href="#" disabled>My Library</NavDropdown.Item>
        <NavDropdown.Item href={accountPath}>Account</NavDropdown.Item>
      </NavDropdown>
    )
  } else {
    return(
      <React.Fragment>
        <Navbar.Brand href={url} className='site-title'>Library App</Navbar.Brand>
        <Nav className="mr-auto" id='nav'>
          <Nav.Link href={url}>Home</Nav.Link>
          <Nav.Link href="#" disabled>My Library</Nav.Link>
          <Nav.Link href={accountPath}>Account</Nav.Link>
        </Nav>
      </React.Fragment>
    )
  }
}

export default function NavBar() {
  return(
    <Navbar bg="dark" variant="dark">
      <NavItems />
      <NavButtons />
    </Navbar>
  )
}