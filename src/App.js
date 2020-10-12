import React from "react";
import "./App.css";
import "react-tagsinput/react-tagsinput.css";
import TagsInput from "react-tagsinput";

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.updateRecipe === undefined) {
      this.state = {
        name: "",
        type: "",
        time: "",
        ingredients: [],
        directions: "",
        updating: false
      };
    } else {
      this.state = {
        name: this.props.updateRecipe.name,
        type: this.props.updateRecipe.type,
        time: this.props.updateRecipe.time,
        ingredients: this.props.updateRecipe.ingredients,
        directions: this.props.updateRecipe.directions,
        updating: true
      };
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

  submit() {}

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
              name="type"
              value={this.state.type}
              onChange={this.handleInputChange}
            >
              <option value="appetizer">Appetizer</option>
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
              onChange={this.handleInputChange}
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
          <button
            id="submit"
            type="submit"
            className="btn btn-primary"
            onClick={this.submit}
          >
            {buttonText}
          </button>
        </form>
      </div>
    );
  }
}

class ExistingRecipes extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div id="existingrecipes">
        <h1>View Recipe</h1>
        <select name="selectrecipe">
          <option value="default" disabled selected>
            Select recipe
          </option>
          <optgroup name="appetizer" label="Appetizers">
            {Object.values(this.props.recipes)
              .filter(e => e.type == "appetizer")
              .map((val, _) => {
                return <option value={val}></option>;
              })}
          </optgroup>
          <optgroup name="entree" label="Entrees">
            {Object.values(this.props.recipes)
              .filter(e => e.type == "entree")
              .map((val, _) => {
                return <option value={val}></option>;
              })}
          </optgroup>
          <optgroup name="side" label="Sides">
            {Object.values(this.props.recipes)
              .filter(e => e.type == "side")
              .map((val, _) => {
                return <option value={val}></option>;
              })}
          </optgroup>
          <optgroup name="dessert" label="Desserts">
            {Object.values(this.props.recipes)
              .filter(e => e.type == "dessert")
              .map((val, _) => {
                return <option value={val}></option>;
              })}
          </optgroup>
        </select>
        <button id="edit" onClick="editRecipe()">
          Edit
        </button>
        <button id="delete" onClick="deleteRecipe()">
          Delete
        </button>

        <div id="recipedisplay">
          <h2 id="name"></h2>
          <h3>Cook Time</h3>
          <p id="cooktime"></p>
          <h3 id="ingredients">Ingredients</h3>
          <ul></ul>
          <h3>Directions</h3>
          <p id="directions"></p>
        </div>
      </div>
    );
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      recipes: {}
    };
  }

  authorize() {
    window.location.href = "/auth";
  }

  componentDidMount() {
    fetch("/api/isLoggedIn")
      .then(r => r.json())
      .then(data => {
        if (data.loggedIn) {
          this.setState({ loggedIn: true });
          fetch("/recipes", {
            method: "GET"
          })
            .then(res => res.json())
            .then(json => {
              let newRecipes = {};
              json.forEach(e => {
                newRecipes[e._id] = e;
              });
              console.log(newRecipes);
              this.setState({ recipes: newRecipes });
            });
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
          <AddRecipe />
          <ExistingRecipes recipes={this.state.recipes} />
        </div>
      );
    } else {
      return (
        <div className="wrapper">
          <div id="logImg">
            <img
              src="https://cdn.glitch.com/e208d6db-20d5-4b5c-8157-015c7735f289%2Flogin.png?v=1601341817635"
              alt="book image"
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
