
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './login.js';
import Main from './main.js'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }
    render() 
      {
        return (
         <div className="login">
          <Login/>
          <Main />
        </div>
          
        
      );
    }
  }

export default App;
