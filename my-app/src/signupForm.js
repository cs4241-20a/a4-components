import React from 'react'
import { Container, Form, FormGroup, Input } from 'reactstrap'
import { Redirect } from 'react-router-dom'




// Sign up a new user
async function signup() {

    console.log("signup")

    // Get username, password from HTML
    let user = document.getElementById("username").value
    let pass = document.getElementById("password").value
    let confirmPass = document.getElementById("confirm_password").value
    let errorMsg = document.getElementById("errorMsg")


    // Validate form 
    if (user === "" || pass === "") {
        errorMsg.innerHTML = "Please enter a username and password"
    } else if (confirmPass === "") {
        errorMsg.innerHTML = "Please confirm your password"
    } else if (pass !== confirmPass) {
        errorMsg.innerHTML = "Passwords don't match"
    } else {
        let allUsers = []

        // Get all users in database
        await fetch('/getAllUsers', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                return response.json()
            })
            .then(json => {
                allUsers = json
                console.log("allUsers = " + allUsers)
            })

        // Check that user doesn't already exist in database
        let cont = true
        for (let cred in allUsers) {
            if (allUsers[cred].username === user) {
                errorMsg.innerHTML = "A user by that name already exists"
                cont = false
            }
        }

        // If username is unique, add new crednetials to database
        if (cont) {
            errorMsg.innerHTML = ""

            // Post to server, DB
            fetch('/addUser', {
                    method: 'POST',
                    body: JSON.stringify({
                        username: user,
                        password: pass
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(function (response) {
                    console.log(response)
                })

            // Log in with new credentials
            fetch('/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        username: user
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(function (response) {
                    console.log(response)
                    window.location.href = "home"
                })
        }
    }
}














export default class SignupForm extends React.Component {
    state = {
        redirect: false
    }

    submitHandler = (event) => {
        event.preventDefault()
        signup()
      }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            // return <Redirect to='/home'/>
        }
    }

    render() {
        return (
            <Container>
                {this.renderRedirect()}
                <Form onSubmit={this.submitHandler}>
                    <FormGroup>
                        <Input type="text" id="username" placeholder="Username" className="form-control" required></Input>
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" id="password" placeholder="Password" className="form-control" required></Input>
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" id="confirm_password" placeholder="Confirm Password" className="form-control" required></Input>
                    </FormGroup>
                    <FormGroup>
                        <Input type="submit" value="Create Account" className="btn btn-primary btn-block submit mt-2 mb-2" onClick={this.setRedirect} ></Input>
                    </FormGroup>
                </Form>
            </Container>
        )
    }
}