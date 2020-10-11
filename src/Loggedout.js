import React, { Component } from 'react';
import './App.css';
import Itemlist from './Itemlist';
import {Route, NavLink, HashRouter} from "react-router-dom";

// main component
class Loggedout extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
        <div className="Login">
            <body>
                <p>You are now logged out.</p>
            </body>
        </div>
    )}
}

export default Loggedout;