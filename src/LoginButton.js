import React from 'react';
import {Redirect} from "react-router";

let authSuccess = false;

//Old button: <button onClick={() => {this.handle_github_login(this)}}>Login</button>

class LoginButton extends React.Component {
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
                        <a href="http://localhost:5000/auth/github/callback">Login</a>

                        <br/><br/><strong>OR</strong><br/><br/>

                        <h1 className="title">Sign in with FPS Stat Calculator account:</h1>
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label" htmlFor="username_input">Username</label>
                            </div>
                            <div className="field-body">
                                <input className="field-body input is-inline" type="text" id="username_input"/>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label" htmlFor="password_input">Password</label>
                            </div>
                            <div className="field-body">
                                <input className="field-body input is-inline" type="text" id="password_input"/>
                            </div>
                        </div>
                        <button className="clear_button button is-primary" onClick={() => {this.handle_login(this)}}>Login</button>
                    </div>
                </div>
            );
        }
    }
    /*
    handle_github_login(component){
        fetch("/auth/github/callback", {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        }).then(function(response){
            console.log(response);
            if(response.headers.get("statusCode") === "302") {
                console.log("redirecting")
                githubLogin = true;
                window.location = response.location;
                redirectURL = response.location;
                component.forceUpdate();
            }
        }).catch(function(error){
            console.log("Error: "+error);
        });
    }
    */

    /**
     * Send a /signin API HTTP request to log into the application with the
     * given username and password.
     */
    handle_login(component){
        //let usernameField = document.getElementById("username_input");
        //let passwordField = document.getElementById("password_input");
        let json = {
            "username": "Joseph",//usernameField.value,
            "password": "ginger0304"//passwordField.value
        }
        let body = JSON.stringify(json);
        fetch("/signin", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body
        }).then(function(response){
            if(response.headers.get("new") === "true"){
                alert("User did not exist, so a new account was created with given username and password");
            }
            authSuccess = true;
            component.forceUpdate();
        });
    }
}

export default LoginButton;