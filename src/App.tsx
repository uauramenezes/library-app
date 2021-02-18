import React from 'react';

import './App.css';
import './Authorization/Authorization.css';

import Search from './Search/Search';
import NavBar from './Navbar/Navbar';

function App() {

  return (
    <div className="App">
        <NavBar />
        <Search />
    </div>
  );
}

export default App;
