import React from "react";
import axios from "axios";
import "./styles.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home'
import Data from './Data'
import Tutorial from './Tutorial'
//https://github.com/nfl/react-helmet
export default class App extends React.Component {
    state = {
        users: [],
      };
      componentDidMount() {
        axios.get("/content.json").then((response) => {
          this.setState({ users: response.data });
        });
      }
    //need to use the state and the componentDidMount() for database stuff!

    //can have event handlers (onclick, onhover, etc) defined here. can have them inside of 
    //this class and access via this.

  render() {
      
    return (
        <Router>
        <div>
            <Switch>
                <Route exact path='/' component={(window.localStorage.getItem('username'))? Data: Home}/>
                <Route path='/data' component={Data}/>
                <Route path='/tutorial' component={Tutorial}/>
            </Switch>
        </div>
    </Router>
    );
  }
}
