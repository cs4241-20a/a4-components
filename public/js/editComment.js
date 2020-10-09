import React from "react";
import ReactDOM from "react-dom";

class EditComment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>
        <b>Edit Comment</b>
        <form>
          <ul class="flex-outer">
            <li>
              <label for="edit-id">ID to modify</label>
              <input type="text" id="edit-id" placeholder="ID" />
            </li>
            <li>
              <button id="load-post">Load Comment</button>
            </li>
            <li style={{ display: "none" }} id="hide-title">
              <label for="edit-title">Title</label>
              <input type="text" id="edit-title" placeholder="Title" />
            </li>
            <li style={{ display: "none" }} id="hide-message">
              <label for="edit-message">Message</label>
              <textarea
                rows="5"
                id="edit-message"
                placeholder="Message"
              ></textarea>
            </li>
            <li style={{ display: "none" }} id="hide-categories">
              <p>Categories</p>
              <ul class="flex-inner">
                <li>
                  <input type="checkbox" id="edit-spoiler" />
                  <label for="edit-spoiler">Spoiler</label>
                </li>
                <li>
                  <input type="checkbox" id="edit-bug" />
                  <label for="edit-bug">Bug</label>
                </li>
                <li>
                  <input type="checkbox" id="edit-fluff" />
                  <label for="edit-fluff">Fluff</label>
                </li>
              </ul>
              <li style={{ display: "none" }} id="hide-button">
                <button id="edit-post">Submit Modification</button>
              </li>
            </li>
          </ul>
        </form>
      </span>
    );
  }
}

const header = document.getElementById("editComment_section");
ReactDOM.render(<EditComment />, header);
