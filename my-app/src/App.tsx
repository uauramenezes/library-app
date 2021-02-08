import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from './components/Navbar'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

import './style/App.css';
import './style/Authorization.css';

function App() {

  return (
    <div className="App">
        <NavBar />
        <Router>
            <Route path='/sign-in'> <SignIn /> </Route>
            <Route path='/sign-up'> <SignUp /> </Route>
        </Router>
    </div>
  );
}

export default App;
