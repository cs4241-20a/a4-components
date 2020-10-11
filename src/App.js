import React from 'react';
import logo from './logo.svg';
import './App.css';
import Itemlist from './Itemlist';
import Login from './Login';
import {Route, NavLink, HashRouter} from "react-router-dom";

function App() {
  return (
    <HashRouter>
    <div className="App">
            <Route path="/" component={Login}/>
    </div>
    </HashRouter>
  );
}

export default App;
