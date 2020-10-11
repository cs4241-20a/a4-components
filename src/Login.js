import React, { Component } from 'react';
import './App.css';
import Itemlist from './Itemlist';
import Loggedout from './Loggedout';
import { Route, NavLink, HashRouter } from "react-router-dom";

// main component
class Login extends Component {
    constructor(props) {
        super(props)
    }

    userLogin(e) {
        const userField = document.querySelector("#username");
        const passField = document.querySelector("#password");
        const username = userField.value;
        const password = passField.value;
        console.log("Username: " + username + " Password: " + password);
        userField.value = "";
        passField.value = "";

        //Talk to server
        fetch("/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
            .then(users => {
                console.log(users)
                if (users.length == 0) {
                    window.alert("Username or password is incorrect.")
                }
                else {
                    //REDIRECT TO THE ITEMLIST GOES HERE
                }
            })
    }

    userCreate(e) {
        const userField = document.querySelector("#username");
        const passField = document.querySelector("#password");
        const username = userField.value;
        const password = passField.value;
        console.log("Username: " + username + " Password: " + password);
        fetch("/create", {
            method: "POST",
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
        //REDIRECT TO ITEMLIST GOES HERE!!!
    }

    logoutButton() {
        const userText = "Out"
        fetch("/logout", {
            method: "POST",
            body: JSON.stringify({ logout: userText.value }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
    }

    render() {
        return (
            <div className="Login">
                <body>
                    <h1>Login</h1>
                    <p>Enter your credentials or Create Account:</p>
                    <label for="username" class="neededLabel">Username *</label>
                    <input id="username" type="text" maxlength="100" required placeholder="Username" />
                    <label for="password" class="neededLabel">Password *</label>
                    <input id="password" type="text" maxlength="100" required placeholder="Password" /><br />
              Password should be secure and unique to your account<br /><br />
              * Passwords and Usernames are case sensitive<br />
                    <HashRouter>
                        <NavLink to="/items"><button id="create-button" onClick={e => this.userCreate(e)}>Create Account</button></NavLink><br />
                        <NavLink to="/items"><button id="login-button" onClick={e => this.userLogin(e)}>Login</button></NavLink><br />
                        <Route path="/items" component={Itemlist} />
                        <NavLink to="/out"><button id="logout" onClick={e => this.logoutButton()}>Logout</button></NavLink>
                        <Route path="/out" component={Loggedout} />
                    </HashRouter>
                    
                </body>
            </div>
        )
    }
}

export default Login;