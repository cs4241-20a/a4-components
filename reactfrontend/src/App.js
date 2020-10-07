import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import UserEntry from './components/UserEntry';
import StorePage from './components/StorePage';
import PasswordChange from './components/PasswordChange'

function App() {
  return (
    <div className="App">
      <Router >
        <Route exact path = "/">
          <UserEntry
          isLogin = {true}/>
        </Route>
        <Route path = "/register">
          <UserEntry
          isLogin = {false}/>
        </Route>
        <Route path = "/store">
          <StorePage/>
        </Route>
        <Route path = "/changePassword">
          <PasswordChange/>
        </Route>
      </Router>

    </div>
  );
}

export default App;
