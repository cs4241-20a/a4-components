import React from 'react';
import './App.css';
import 'react-tagsinput/react-tagsinput.css'
import TagsInput from 'react-tagsinput'

class AddRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tags: []}
    }

    handleChange(tags) {
        this.setState({tags: tags})
    }

    render() {
        return (
            <div className="addrecipe">
                <h1 id="header">Add Recipe</h1>
                <form id="recipeForm">
                    <div className="form-group">
                        <label htmlFor="nameInput">Recipe Name</label>
                        <input id="nameInput" className="form-control" type="text" name="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="typeInput">Recipe Type</label>
                        <select id="typeInput" className="form-control" name="type">
                            <option value="appetizer">Appetizer</option>
                            <option value="entree">Entree</option>
                            <option value="side">Side</option>
                            <option value="dessert">Dessert</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Cooking Time</label>
                        <input id="timeInput" className="form-control" type="text" name="time"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="addingredients">Ingredients</label>
                        <TagsInput value={this.state.tags} onChange={this.handleChange.bind(this)}/>
                        <small className="form-text text-muted">Press comma after each ingredient</small>
                    </div>
                    <div className="form-group">
                        <label>Directions</label>
                        <textarea id="directionsInput" className="form-control" name="directions"></textarea>
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                    <button id="update" className="btn btn-primary" style={{visibility: 'hidden'}}
                            onClick="updateRecipe(); return false">Update
                    </button>
                </form>
            </div>
        )
    }
}

class ExistingRecipes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="existingrecipes">
                <h1>View Recipe</h1>
                <select name="selectrecipe">
                    <option value="default" disabled selected>Select recipe</option>
                    <optgroup name="appetizer" label="Appetizers">
                        {this.props.recipes.filter(e => e.type == 'appetizer').map((val, _) => {
                            return <option value={val}></option>
                        })}
                    </optgroup>
                    <optgroup name="entree" label="Entrees">
                        {this.props.recipes.filter(e => e.type == 'entree').map((val, _) => {
                            return <option value={val}></option>
                        })}
                    </optgroup>
                    <optgroup name="side" label="Sides">
                        {this.props.recipes.filter(e => e.type == 'side').map((val, _) => {
                            return <option value={val}></option>
                        })}
                    </optgroup>
                    <optgroup name="dessert" label="Desserts">
                        {this.props.recipes.filter(e => e.type == 'dessert').map((val, _) => {
                            return <option value={val}></option>
                        })}
                    </optgroup>
                </select>
                <button id="edit" onClick="editRecipe()">Edit</button>
                <button id="delete" onClick="deleteRecipe()">Delete</button>

                <div id="recipedisplay">
                    <h2 id="name"></h2>
                    <h3>Cook Time</h3>
                    <p id="cooktime"></p>
                    <h3 id="ingredients">Ingredients</h3>
                    <ul>
                    </ul>
                    <h3>Directions</h3>
                    <p id="directions"></p>
                </div>
            </div>
        )
    }
}

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            recipes: {}
        }
    }

    authorize() {
        fetch('/auth')
    }

    componentDidMount() {
        fetch('/recipes', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(json => {
                let newRecipes = {}
                json.forEach(e => {
                    newRecipes[e._id] = e
                })
                this.setState({recipes: newRecipes})
            })
    }

    render() {
        if (this.state.loggedIn) {
            return (
                <div className="App">
                    <div id="logImg">
                        <img src="images/book.png" className="book"/>
                    </div>
                    <AddRecipe/>
                    <ExistingRecipes recipes={this.state.recipes}/>
                </div>
            )
        } else {
            return (
                <div className="wrapper">
                    <div id="logImg">
                        <img
                            src="https://cdn.glitch.com/e208d6db-20d5-4b5c-8157-015c7735f289%2Flogin.png?v=1601341817635"
                            alt="book image"/>
                    </div>
                    <div className="inner">
                        <h1>Recipe Book</h1>
                        <button id="github-button" onClick={this.authorize}
                                className="btn btn-block btn-social btn-github">
                            <i className="fa fa-github"></i> Sign in with Github
                        </button>
                    </div>
                </div>
            )
        }

    }
}

function App() {
    return (
        <Main/>
    );
}

export default App;
