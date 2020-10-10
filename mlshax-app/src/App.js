import React from 'react';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {withRouter} from 'react-router-dom';

class Todo extends React.Component {
  // our .render() method creates a block of HTML using the .jsx format
  // render() {
  //   return <li>{this.props.name} : 
  //     <input type="checkbox" defaultChecked={this.props.completed} name2={this.props.name} onChange={ e => this.change(e) }/>
  //   </li>
  // }
  // // call this method when the checkbox for this component is clicked
  // change(e) {
  //   this.props.onclick( this.props.name, e.target.checked )
  // }
}

// main component
class App extends React.Component {
  constructor( props ) {
    super( props )
    // initialize our state
    this.state = { users:[], account:"guest" };
    //this.load();
    this.addUser = this.addUser.bind(this);
    this.loginAction = this.loginAction.bind(this);
    this.githubAction = this.githubAction.bind(this);
    this.login = React.createRef();
    this.error = React.createRef();
    this.github = React.createRef();
  }

  addUser(user, pass, id) {
    const newUser = document.createElement("li");
    newUser.innerText = user + " " + pass;

    const toAdd = {"user": user, "pass": pass, "id": id};

    this.setState({users: [...this.state.users, toAdd]});

  }
  
  loginAction() {
  
    let newUser = this.login.elements.username.value;
    let newPass = this.login.elements.password.value;
    
    let createAccount = true;

    this.state.users.forEach(user => {
      if(user.user.localeCompare(newUser) === 0) {
        createAccount = false;
        if(user.pass.localeCompare(newPass) === 0) {
          this.setState({account: newUser});
          localStorage.setItem("account", newUser);
          this.props.history.replace('/schedule');
        }
        else {
          this.error.innerHTML = "<span class='label label-danger'>ERROR: Wrong Password for this Username</span>";
        }
      }
    })
  
    if(createAccount) {
      
      fetch("/add", {
        method: "POST",
        body: JSON.stringify({ user: newUser, pass: newPass }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(json => {
          this.addUser(json.user, json.pass, json._id);
          this.setState({account: json.user});
          localStorage.setItem("account", newUser);
          this.props.history.replace('/schedule');
        });
      
    }
    
    this.login.reset();
    this.login.elements.username.focus();
  }

  githubAction() {
    localStorage.setItem("account", "github");
    document.location.href = `https://github.com/login/oauth/authorize?client_id=bbe908208af155698563`;
  }

  // render component HTML using JSX 
  render() {
    return (
      <div>    
          
        <title>CS4241 Assignment 3</title>
        <meta charSet="utf-8" />
        <div className="container">
          <div className="content">
            <div id="error" ref = {ref => this.error = ref}>
            </div>
          </div>
          <form ref = {ref => this.login = ref} onSubmit = {e => e.preventDefault()}>
            <input id="username" placeholder="Username" />
            <input id="password" placeholder="Password" />
            <button type="submit" className="btn btn-sm btn-primary">Login</button>
            <button type="button" className="btn btn-sm btn-success" id="github" ref={ref=>this.github=ref}>Login with Github</button>
          </form>
          <div className="content">
            <p>
              If you do not have an account, a new one will be created for you
            </p>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {

    fetch("/users")
    .then(res => res.json())
    .then(json => {
      Array.from(json).forEach(user => this.addUser(user.user, user.pass, user._id))
    })

    this.login.addEventListener('submit', this.loginAction);
    this.github.addEventListener('click', this.githubAction);
  }
}

export default withRouter(App);