import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css'
import HomePage from './home'
import LoginPage from './login'
import SignupPage from './signup'


const App = () => (

  <div className="app-routes">
  <Switch>
    <Route exact={true} path="/" component={LoginPage} />
    <Route exact={true} path="/home" component={HomePage} />
    <Route exact={true} path="/signup" component={SignupPage} />
  </Switch>
</div>
)

export default App