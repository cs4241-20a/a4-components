import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      username: '',
      password: ''
    }
    
    this.login = this.login.bind(this);
  }
  
  login(){
    fetch("/login", {
       method: "POST", 
       body: JSON.stringify({username: this.state.username, password: this.state.password}),
       headers: {
          "Content-Type": "application/json"
        }
    }).then(response => response.json())
      .then(json => {
        if(json.message === "new"){
          window.location.replace("/login")
        }else if(json.message === "user exists"){
          window.location.replace("login")
        }else if(json.message === "wrong pw"){
          alert("The password you have entered is incorrect. Please try again")
        }else{
          alert("Something went wrong. Please try again!")
        }
      });
   window.location.replace("/login")
  }
  
  render() {
    return (
      <div id="root">
        <body>
          <h1>Log In</h1>
          <form action="/login" id="login">
            <input
              type="text"
              name="username"
              required
              placeholder="Enter Username"
            />
            <input
              type="password"
              name="password"
              required
              placeholder="Enter Password"
            />
            <button onClick={this.login} type="submit" id="signin" style="margin-top: 30px">
              Sign In
            </button>
          </form>
        </body>
      </div>
    );
  }
}

export default App;
