import React from "react";
import ReactDOM from "react-dom";

class AllPosts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>
        <b>All posts</b>
        <br />
        <br />
        <div id="posts"></div>
      </span>
    );
  }
}

const header = document.getElementById("posts_section");
ReactDOM.render(<AllPosts />, header);
