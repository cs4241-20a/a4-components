import React, {useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";


import Auth from "./layouts/Auth";

import Profile from "./views/Profile";
import Index from "./views/Index.js";


export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loginUser, setLoginUser] = useState(null);

  const auth = {
    authenticate() {
      fetch('/isAuth')
        .then(response => response.json())
        .then(json => {
          if (json.code === 200) {
            setIsAuthenticated(true);
            setLoginUser(json.user);
          } else {
            setIsAuthenticated(false);
            setLoginUser("");
          }
        })
    }
  }

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated === null ? auth.authenticate() : isAuthenticated
        ? <Component {...props} loginUser={loginUser}/>
        : <Redirect to="/auth/login"/>
    )} />
  )

  return (
    <Switch>
      <Route path="/auth" component={Auth} />

      <Route path="/profile/:userId" exact component={Profile} />
      <PrivateRoute path='/' component={Index} />

      <Redirect from="*" to="/"/>
    </Switch>
  );
};
