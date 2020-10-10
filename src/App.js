import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      grocerylist: [],
      item: ''  
    };
    this.addItem = this.addItem.bind(this);
    this.modifyItem = this.modifyItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  

  addItem() {
    fetch("/add", {
      method: "POST",
      body: JSON.stringify({ item: this.state.item }),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ groceryList: json });
      });
  }

  modifyItem(e) {
    e.preventDefault();
    fetch("/modify", {
      method: "post"
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ groceryList: json });
      });
  }


  deleteItem(_id) {
    fetch("/delete", { method: "POST" })
      .then(response => response.json())
      .then(json => {
        this.setState({ groceryList: json });
      });
  }

  render() {
    return (
      <div id="root">
        <header>
          <img src="https://cdn.glitch.com/da33b4ec-6b69-434a-ac9d-30e1c159877c%2FUntitled%20design.png?v=1601312600477" />
          <h1>Shopping List</h1>
          <h4>A simple app to record your groceries!</h4>
        </header>

        <form id="todoform">
          <label>
            New Shopping List:
            <input
              name="dream"
              value={this.state.item}
              onChange={e => {this.setState({item:e.target.value})}}
              type="text"
              required
              placeholder=" Add an item"
            />
            <p id="describe">For example, "apples" or "paper towels"</p>
          </label>
          <button
            type="submit"
            id="submit"
            onClick={this.addItem}>
            Add Item
          </button>
        </form>

        <p>To modify an item, click once. To delete an item, double click.</p>

        <section class="dreams">
            <ul>
              <li>{this.state.item}</li>
            </ul>
        </section>

        <footer>
          Made with <a href="https://glitch.com">Glitch</a>!
        </footer>
      </div>
    );
  }
}

export default App;
