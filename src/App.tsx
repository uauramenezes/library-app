import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';
import './Authorization/Authorization.css';

import Search from './Search/Search';
import NavBar from './Navbar/Navbar';
import SignIn from './Authorization/SignIn';
import SignUp from './Authorization/SignUp';

function App() {

  return (
    <div className="App">
        <NavBar />
        <Router>
            <Route exact path='/'> <Search /> </Route>
            <Route path='/sign-in'> <SignIn /> </Route>
            <Route path='/sign-up'> <SignUp /> </Route>
        </Router>
    </div>
  );
}

export default App;
