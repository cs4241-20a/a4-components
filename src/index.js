import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import App from "./App";
import LoginButton from "./LoginButton";

/**
 * Top-level component for the entire application: switches from LoginButton to
 * App component once user has logged in.
 */
ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Switch>
              <Route exact path="/app" component={App}/>
              <Route exact path="/" component={LoginButton}/>
          </Switch>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
