import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Test from "./Test";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Song from "./Song";
import Songs from "./Songs";
import "./styles/base.css";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/test">Test</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/songs">My Songs</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Switch>
        <Route path="/test">
          <Test />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/songs">
          <Songs />
        </Route>
        <Route path="/song/:id" component={Song} />
      </Switch>
    </Router>
  );
}

export default App;
