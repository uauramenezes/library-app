import React from 'react';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">My App</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">About</Nav.Link>
            <Nav.Link href="#pricing">Library</Nav.Link>
            </Nav>
            <Form inline>
            <Button variant="outline-info" className='mr-sm-3'>Sign In</Button>
            <Button variant="outline-info">Sign Up</Button>
            </Form>
        </Navbar>
    </div>
  );
}

export default App;
