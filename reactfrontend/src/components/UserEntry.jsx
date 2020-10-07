import React, { Component } from 'react'

function login(e){
    console.log('login page button clicked')
    // prevent default form action from being carried out
    e.preventDefault()

    const username = document.querySelector( '#username' ).value;
    const pass = document.querySelector( '#password' ).value;
    let json = { username: username,
                password: pass};
    let body = JSON.stringify( json );

    fetch( '/login', {
        method:'POST',
        body : body,
        headers:{
            "Content-Type": "application/json"
        }
    })
    .then(function(response){
        if (response.redirected == true){
        window.open(response.url, "_self")
        } else {
        return  response.json()
        }
        
    })
    .then( function( json ) {
        let errmsg = document.getElementById('errormsg');
        if (json.error == 'password'){
        errmsg.innerText = "Password Incorrect"
        } else { //username not found
        errmsg.innerText = "Username not found"
        }
    })

    return false;
}

function register(e){
    console.log('register page button clicked')

    // prevent default form action from being carried out
    e.preventDefault()

    const username = document.querySelector( '#username' ).value;
    const pass = document.querySelector( '#password' ).value;
    let json = { username: username,
                password: pass};
    let body = JSON.stringify( json );

    fetch( '/register', {
        method:'POST',
        body : body,
        headers:{
            "Content-Type": "application/json"
        }
    })
    .then(function(response){
        return  response.json()
    })
    .then( function( json ) {
        if (json.code == 'found'){
            alert('This username already exists')
        } else {
            window.open('/store', "_self")
        }
    })

    return false;
    
}

export class UserEntry extends Component {
    constructor(props){
        super(props);
        if(props.isLogin){
            this.buttonClick = login;
        } else {
            this.buttonClick = register;
        }
    }
    


    render() {
        return (
            <div>
                <p id = "errormsg"></p>
                <div className="columns is-centered" style = {{"margin": "10px"}}>
                    <div className = "column has-text-centered">
                        <p id = "errormsg"></p>
                        <input type='text' id='username' placeholder="Username here"/>
                        <br/>
                        <input type='text' id='password' placeholder="Password here"/>
                        <br/>
                        <button onClick = {this.buttonClick}>Submit</button>
                    </div>
                    <div className = "column has-text-centered ">
                        <a href = "/auth/github" target="_blank" rel="noopener noreferrer">
                            <p>Login with github OAuth</p>
                            <img src = "img/githubLogo.png"/>
                        </a>
                    </div>

                    {this.props.isLogin  ?  (<div className = "column has-text-centered">
                        <a href="/register" >
                            <p>
                                Register for account
                            </p>
                        
                        </a>
                    </div>) : "" }
                </div>
                <div style = {{bottom: "50px", position:"fixed"}}>Icons made by 
                    <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> 
                from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
            </div>
        )
    }
}

export default UserEntry
