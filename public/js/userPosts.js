import React from "react";
import ReactDOM from "react-dom";

class UserPosts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>
        <b>Your posts</b>
        <br />
        <br />
        <div id="userposts"></div>
      </span>
    );
  }
}

const header = document.getElementById("userposts_section");
ReactDOM.render(<UserPosts />, header);
