import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Search from './components/Search';
import NavBar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <NavBar />
            <Switch>
                <Route exact path='/' component={Search} />
                <Route exact path='/sign-in' component={SignIn} />
                <Route exact path='/sign-up' component={SignUp} />
            </Switch>
        </Router>
    );
}

export default App;
