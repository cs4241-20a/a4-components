import React from "react";
import ReactDOM from "react-dom";

class DeleteComment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>
        <b>Delete Comment</b>

        <form>
          <ul class="flex-outer">
            <li>
              <label for="delete-id">ID to delete</label>
              <input type="text" id="delete-id" placeholder="ID" />
            </li>
            <li>
              <button id="delete-post">Delete Comment</button>
            </li>
          </ul>
        </form>
      </span>
    );
  }
}

const header = document.getElementById("deleteComment_section");
ReactDOM.render(<DeleteComment />, header);
