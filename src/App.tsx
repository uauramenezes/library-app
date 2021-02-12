import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './style/App.css';
import './style/Search.css';
import './style/Navbar.css';
import './style/Authorization.css';

import Search from './components/Search';
import NavBar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

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
