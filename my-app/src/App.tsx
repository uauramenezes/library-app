import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './style/App.css';
import './style/Home.css';
import './style/Navbar.css';
import './style/Authorization.css';

import Home from './components/Home';
import NavBar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {

  return (
    <div className="App">
        <NavBar />
        <Router>
            <Route path='/'> <Home /> </Route>
            <Route path='/sign-in'> <SignIn /> </Route>
            <Route path='/sign-up'> <SignUp /> </Route>
        </Router>
    </div>
  );
}

export default App;
