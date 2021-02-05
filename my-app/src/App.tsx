import React from 'react';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from './components/SignIn/SignIn'

function App() {
  return (
    <div className="App">
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">My App</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#features">About</Nav.Link>
            <Nav.Link href="#pricing">Library</Nav.Link>
            </Nav>
            <Form inline>
            <Button variant="outline-info" className='mr-sm-3' href="/sign-in">
                Sign In
            </Button>
            <Button variant="outline-info">Sign Up</Button>
            </Form>
        </Navbar>
        <Router>
            <Route path='/sign-in'> <SignIn /> </Route>
        </Router>
    </div>
  );
}

export default App;
