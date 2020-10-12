import React from "react";
import "./App.css";
import "react-tagsinput/react-tagsinput.css";
import TagsInput from "react-tagsinput";

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.update = this.update.bind(this);
    this.reset = this.reset.bind(this);
    console.log(this.props);
    if (this.props.updateRecipe.hasOwnProperty("name")) {
      this.state = {
        name: this.props.updateRecipe.name,
        type: this.props.updateRecipe.type,
        time: this.props.updateRecipe.time,
        ingredients: this.props.updateRecipe.ingredients,
        directions: this.props.updateRecipe.directions,
        updating: true
      };
    } else {
      this.state = {
        name: "",
        type: "appetizer",
        time: "",
        ingredients: [],
        directions: "",
        updating: false
      };
    }
  }

  componentDidUpdate(prev) {
    if (
      this.props.updateRecipe.hasOwnProperty("name") &&
      prev.updateRecipe.name !== this.props.updateRecipe.name
    ) {
      this.setState({
        id: this.props.updateRecipe._id,
        name: this.props.updateRecipe.name,
        type: this.props.updateRecipe.type,
        time: this.props.updateRecipe.time,
        ingredients: this.props.updateRecipe.ingredients,
        directions: this.props.updateRecipe.directions,
        updating: true
      });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleChange(ingredients) {
    this.setState({ ingredients });
  }

  reset() {
    this.setState({
      id: "",
      name: "",
      type: "appetizer",
      time: "",
      ingredients: [],
      directions: "",
      updating: false
    });
    this.props.refreshList();
  }

  submit(e) {
    e.preventDefault();
    fetch("/api/add", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        type: this.state.type,
        time: this.state.time,
        ingredients: this.state.ingredients,
        directions: this.state.directions
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(r => r.json())
      .then(this.reset);
  }

  update(e) {
    e.preventDefault();
    fetch("/api/update", {
      method: "POST",
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        type: this.state.type,
        time: this.state.time,
        ingredients: this.state.ingredients,
        directions: this.state.directions
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(r => r.json())
      .then(this.reset);
  }

  render() {
    let buttonText = "Submit";
    if (this.state.updating) {
      buttonText = "Update";
    }
    return (
      <div className="addrecipe">
        <h1 id="header">Add Recipe</h1>
        <form id="recipeForm">
          <div className="form-group">
            <label htmlFor="nameInput">Recipe Name</label>
            <input
              id="nameInput"
              className="form-control"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="typeInput">Recipe Type</label>
            <select
              id="typeInput"
              name="type"
              className="form-control"
              value={this.state.type}
              onChange={this.handleInputChange}
            >
              <option value="appetizer" defaultValue>
                Appetizer
              </option>
              <option value="entree">Entree</option>
              <option value="side">Side</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>
          <div className="form-group">
            <label>Cooking Time</label>
            <input
              id="timeInput"
              className="form-control"
              type="text"
              name="time"
              value={this.state.time}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="addingredients">Ingredients</label>
            <TagsInput
              name="ingredients"
              value={this.state.ingredients}
              onChange={this.handleChange.bind(this)}
            />
            <small className="form-text text-muted">
              Press tab after each ingredient
            </small>
          </div>
          <div className="form-group">
            <label>Directions</label>
            <textarea
              id="directionsInput"
              className="form-control"
              name="directions"
              value={this.state.directions}
              onChange={this.handleInputChange}
            ></textarea>
          </div>
          {this.state.updating || (
            <button
              id="submit"
              type="submit"
              className="btn btn-primary"
              onClick={this.submit}
            >
              Submit
            </button>
          )}
          {this.state.updating && (
            <button
              id="update"
              type="submit"
              className="btn btn-primary"
              onClick={this.update}
            >
              Update
            </button>
          )}
        </form>
      </div>
    );
  }
}

class ExistingRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this)
    this.state = { selectedRecipe: {} };
  }

  handleSelect(event) {
    let value = event.target.value;
    this.setState({ selectedRecipe: this.props.recipes[value] });
  }

  delete() {
    console.log(this.state.selectedRecipe)
    fetch("/api/delete", {
      method: "POST",
      body: JSON.stringify({
        id: this.state.selectedRecipe._id
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(r => r.json())
      .then(this.reset);
  }

  render() {
    let recipeDisplay;
    if (this.state.selectedRecipe.name) {
      recipeDisplay = (
        <div id="recipedisplay">
          <h2 id="name">{this.state.selectedRecipe.name}</h2>
          <h3>Cook Time</h3>
          <p id="cooktime">{this.state.selectedRecipe.time}</p>
          <h3 id="ingredients">Ingredients</h3>
          <ul>
            {this.state.selectedRecipe.ingredients.map(i => (
              <li>{i}</li>
            ))}
          </ul>
          <h3>Directions</h3>
          <p id="directions">{this.state.selectedRecipe.directions}</p>
        </div>
      );
    }
    return (
      <div id="existingrecipes">
        <h1>View Recipe</h1>
        <select
          name="selectrecipe"
          value={this.state.selectedRecipe._id}
          onChange={this.handleSelect.bind(this)}
        >
          <option value="def" disabled>
            Select recipe
          </option>
          <optgroup name="appetizer" label="Appetizers">
            {Object.values(this.props.recipes)
              .filter(v => v.type === "appetizer")
              .map(v => {
                return (
                  <option key={v._id} value={v._id}>
                    {v.name}
                  </option>
                );
              })}
          </optgroup>
          <optgroup name="entree" label="Entrees">
            {Object.values(this.props.recipes)
              .filter(v => v.type === "entree")
              .map(v => {
                return (
                  <option key={v._id} value={v._id}>
                    {v.name}
                  </option>
                );
              })}
          </optgroup>
          <optgroup name="side" label="Sides">
            {Object.values(this.props.recipes)
              .filter(v => v.type === "side")
              .map(v => {
                return (
                  <option key={v._id} value={v._id}>
                    {v.name}
                  </option>
                );
              })}
          </optgroup>
          <optgroup name="dessert" label="Desserts">
            {Object.values(this.props.recipes)
              .filter(v => v.type === "dessert")
              .map(v => {
                return (
                  <option key={v._id} value={v._id}>
                    {v.name}
                  </option>
                );
              })}
          </optgroup>
        </select>
        {this.state.selectedRecipe.name && (
          <button
            id="edit"
            onClick={() =>
              this.props.editRecipeHandler(this.state.selectedRecipe)
            }
          >
            Edit
          </button>
        )}
        {this.state.selectedRecipe.name && (
          <button id="delete" onClick={this.delete}>
            Delete
          </button>
        )}
        {recipeDisplay}
      </div>
    );
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.state = {
      loggedIn: false,
      recipes: {},
      editingRecipe: {}
    };
  }

  authorize() {
    window.location.href = "/auth";
  }

  editRecipe(recipe) {
    this.setState({ editingRecipe: recipe });
    console.log(this.state);
  }

  refreshList() {
    fetch("/api/recipes")
      .then(res => res.json())
      .then(json => {
        let newRecipes = {};
        json.forEach(e => {
          newRecipes[e._id] = e;
        });
        this.setState({ recipes: newRecipes });
      });
  }

  componentDidMount() {
    fetch("/api/isLoggedIn")
      .then(r => r.json())
      .then(data => {
        if (data.loggedIn) {
          this.setState({ loggedIn: true });
          this.refreshList();
        }
      });
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div className="App">
          <div id="logImg">
            <img src="images/book.png" className="book" />
          </div>
          <AddRecipe
            refreshList={this.refreshList}
            updateRecipe={this.state.editingRecipe}
          />
          <ExistingRecipes
            editRecipeHandler={this.editRecipe.bind(this)}
            recipes={this.state.recipes}
          />
        </div>
      );
    } else {
      return (
        <div className="wrapper">
          <div id="logImg">
            <img
              src="https://cdn.glitch.com/e208d6db-20d5-4b5c-8157-015c7735f289%2Flogin.png?v=1601341817635"
              alt="book"
            />
          </div>
          <div className="inner">
            <h1>Recipe Book</h1>
            <button
              id="github-button"
              onClick={this.authorize}
              className="btn btn-block btn-social btn-github"
            >
              <i className="fa fa-github"></i> Sign in with Github
            </button>
          </div>
        </div>
      );
    }
  }
}

function App() {
  return <Main />;
}

export default App;
