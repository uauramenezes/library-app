import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

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
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route exact path='/' component={Search} />
                <Route exact path='/sign-in' component={SignIn} />
                <Route exact path='/sign-up' component={SignUp} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
