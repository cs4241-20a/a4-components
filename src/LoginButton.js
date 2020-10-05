import React from 'react';
import {Redirect} from "react-router";

let authSuccess = false;
class LoginButton extends React.Component {
    render(){
        if(authSuccess === true){
            return (
                <Redirect to="/app"/>
            );
        }else {
            return (
                <button className="clear_button button is-primary" onClick={() => {this.handle_login(this)}}>Login</button>
            );
        }
    }

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