import React from "react";
import ReactDOM from "react-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>
        <h1>the forum</h1>
        <button id="logout">Log out</button>
      </span>
    );
  }
}

const header = document.getElementById("header_section");
ReactDOM.render(<Header />, header);
