import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Test from "./Test";
import Home from "./Home";

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
      </Switch>
    </Router>
  );
}

export default App;
