import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import App from "./App";
import LoginButton from "./LoginButton";

ReactDOM.render(
  <React.StrictMode>
      <h1 className="title has-text-centered">Login</h1>
      <BrowserRouter>
          <switch>
              <Route exact path="/app" component={App}/>
              <Route exact path="/" component={LoginButton}/>
          </switch>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('login_root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
