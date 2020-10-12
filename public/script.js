// client-side js, loaded by index.html
// run by the browser each time the page is loaded

console.log("hello world :o");
//import React from "react";
//import ReactDOM from "react-dom";

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dreamText: "",
      dreams: []
    };

    //https://reactjs.org/docs/faq-functions.html
    //make things nice by binding functions we'll need in the constructor
    this.addDream = this.addDream.bind(this);
    this.editDream = this.editDream.bind(this);
    this.deleteDream = this.deleteDream.bind(this);
    this.getDreams = this.getDreams.bind(this);
    this.addDreamToArray = this.addDreamToArray.bind(this);
  }

  addDream(e) {
    e.preventDefault();

    var dreamJSON = { dream: this.state.dreamText };
    var body = JSON.stringify(dreamJSON);
    fetch("/add", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        this.addDreamToArray(json.dream);
      });

    this.setState({ dreamText: "" });
  }

  editDream(e) {
    e.preventDefault();
    var oldDream = e.target.getAttribute("id").substring(2);
    var newDream = prompt("Enter new text:", "New Text");
    if (newDream != null && newDream != undefined && newDream != "") {
      //send the string over
      var result = { oldText: oldDream, newText: newDream };
      fetch("/edit", {
        method: "POST",
        body: JSON.stringify(result),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(dreams => {
          const editedDreamList = this.state.dreams.map(dream => {
            // if this task has the same ID as the edited task
            if (dream === oldDream) {
              //
              return newDream;
            }
            return dream;
          });
          this.setState({dreams: editedDreamList})
          /*var index = this.state.dreams.findIndex(oldDream);
          var newState = this.state.dreams;
          newState[index] = newDream;
          this.setState({ dreams: newState });*/
        });
    }
  }

  deleteDream(e) {
    e.preventDefault();
    var oldDream = e.target.getAttribute("id").substring(2);

    fetch("/delete", {
      method: "POST",
      body: JSON.stringify({ dream: oldDream }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        var filtered = this.state.dreams.filter(function(e) {
          return e !== oldDream;
        });
        this.setState({ dreams: filtered });
      });
  }

  getDreams() {
    //fetches from /dreams
    //puts everything from the array it gets into the this.state.dreams[] array
    //basically the old start function but with some minor changes
    fetch("/dreams")
      .then(response => response.json()) // parse the JSON from the server
      .then(dreamsArr => {
        this.setState({ dreams: dreamsArr });
        //dreams.forEach(appendNewDream);
        console.log(dreamsArr);
      });
  }

  addDreamToArray(aDream) {
    this.setState(state => {
      // Important: read `state` instead of `this.state` when updating.
      var dreams2 = state.dreams;
      dreams2.push(aDream);
      return { dreams: dreams2 };
    });
  }

  componentDidMount() {
    this.getDreams();
  }

  render() {
    return (
      <div>
        <header>
          <h1>Generic TODO List</h1>
        </header>
        <a href="/login">Login </a>
        <a href="/register">Register </a>
        <a href="/logout">Logout </a>
        <form id="dreamForm" className="pure-form">
          <label>
            Add Item to To Do List
            <input
              name="dream"
              type="text"
              value={this.state.dreamText}
              placeholder="Task"
              maxLength="100"
              onChange={e => this.setState({ dreamText: e.target.value })}
            />
          </label>
          <button
            type="submit"
            id="submit-dream"
            className="pure-button pure-button-primary button-success"
            onClick={e => this.addDream(e)}
          >
            Add Task
          </button>
        </form>
        <section className="dreams">
          <ul id="Dreams">
            {this.state.dreams.map((dream, index) => {
              return (
                <li key={index}>
                  {" "}
                  {dream}
                  <button
                    className="delete-button pure-button"
                    id={`D${index}${dream}`}
                    onClick={e => this.deleteDream(e)}
                  >
                    Delete
                  </button>
                  <button
                    className="edit-button pure-button"
                    id={`E${index}${dream}`}
                    onClick={e => this.editDream(e)}
                  >
                    Edit
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    );
  }
}
ReactDOM.render(
  React.createElement(TodoList),
  document.getElementById("list-for-react")
);

// define variables that reference elements on our page
/*const dreamsList = document.getElementById("dreams");
const dreamsForm = document.querySelector("#dreamForm");

// a helper function that creates a list item for a given dream
function appendNewDream(dream, id) {
  const newListItem = document.createElement("li");
  newListItem.innerText = dream + " ";

  var delButton = document.createElement("button");
  delButton.innerText = "Delete";
  delButton.setAttribute("id", "Delete");
  delButton.setAttribute("class", "delete-button pure-button");
  newListItem.append(delButton);

  var editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.setAttribute("id", "Edit");
  editButton.setAttribute("class", "edit-button pure-button");
  newListItem.append(editButton);

  delButton.onclick = function() {
    fetch("/delete", {
      method: "POST",
      body: JSON.stringify({ dream: dream }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        newListItem.remove();
      });
  };

  editButton.onclick = function() {
    var newStr = prompt("Enter new text:", "New Text");
    if (newStr != null && newStr != undefined && newStr != "") {
      //send the string over
      var result = { oldText: dream, newText: newStr };
      fetch("/edit", {
        method: "POST",
        body: JSON.stringify(result),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => response.json())
      .then( dreams =>{
        newListItem.innerText = newStr + " ";
        newListItem.append(delButton);
        newListItem.append(editButton);
      });
    }
  };

  dreamsList.appendChild(newListItem);
}

// fetch the initial list of dreams
fetch("/dreams")
  .then(response => response.json()) // parse the JSON from the server
  .then(dreams => {
    // remove the loading text
    dreamsList.firstElementChild.remove();

    // iterate through every dream and add it to our page
    dreams.forEach(appendNewDream);
  });

// listen for the form to be submitted and add a new dream when it is
dreamsForm.addEventListener("submit", event => {
  // stop our form submission from refreshing the page
  event.preventDefault();

  // get dream value and add it to the list
  let newDream = dreamsForm.elements.dream.value;

  fetch("/add", {
    method: "POST",
    body: JSON.stringify({ dream: newDream }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(json => {
      appendNewDream(json.dream, json._id);
    });

  // reset form
  dreamsForm.reset();
  dreamsForm.elements.dream.focus();
});*/
