import React from 'react';
import {Redirect} from "react-router-dom";

let authSuccess = false;

/**
 * Component for displaying and handling the different login options for users.
 * Equivalent to index.html from A3 (i.e the login screen).
 */
class LoginButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    
    /**
     * Handles input for the username and password fields, updating their corresponding 
     * state variables appropriately.
     */
    handleInput(inputEvent) {
        this.setState({
            [inputEvent.target.name]: inputEvent.target.value,
        });
    }
    
    render(){
       if(authSuccess === true){
            return (
                <Redirect to="/app"/>
            );
        }else {
            return (
                <div className="column is-one-third">
                    <div className="box is-border has-background-info-light is-rounded">
                        <h1 className="title">Login with Github</h1>
                        <a href="https://a4-joe-swetz.glitch.me/auth/github/callback">Login</a>
                        
                        <br/><br/><strong>OR</strong><br/><br/>

                        <h1 className="title">Sign in with FPS Stat Calculator account:</h1>
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label" htmlFor="username_input">Username</label>
                            </div>
                            <div className="field-body">
                                  <input name="username" className="field-body input is-inline" type="text" id="username_input"
                                    onChange={this.handleInput}/>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label" htmlFor="password_input">Password</label>
                            </div>
                            <div className="field-body">
                                <input name="password" className="field-body input is-inline" type="text" id="password_input"
                                  onChange={this.handleInput}/>
                            </div>
                        </div>
                        <button className="clear_button button is-primary" onClick={this.handleLogin}>Login</button>
                    </div>
                </div>
            );
        }
    }
    
    /**
     * Send a /signin API HTTP request to log into the application with the
     * given username and password.
     */
    handleLogin(){
        let json = {
            "username": this.state.username,
            "password": this.state.password
        }
        let body = JSON.stringify(json);
        fetch("/signin", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body
        }).then(response => {
            if(response.headers.get("new") === "true"){
                alert("User did not exist, so a new account was created with given username and password");
            }
            authSuccess = true;
            this.forceUpdate();
        });
    }
}

export default LoginButton;