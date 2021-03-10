import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CookiesProvider } from "react-cookie";

import App from './App';

import './static/css/Authorization.css';
import './static/css/Search.css';
import './static/css/Navbar.css';
import './static/css/index.css';

ReactDOM.render(
    <CookiesProvider>
        <App />
    </CookiesProvider>,
  document.getElementById('root')
);
