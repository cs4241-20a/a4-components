import React from 'react'
import { Container, Form, FormGroup, Input } from 'reactstrap'
import { Redirect } from 'react-router-dom'


async function login() {

    // Get HTML elements
    let user = document.getElementById("username").value
    let pass = document.getElementById("password").value
    let errorMsg = document.getElementById("errorMsg")

    // Validate form 
    if (user === "" || pass === "") {
        errorMsg.innerHTML = "Please enter a username and password"
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
            })

        // Are the login creds valid?
        let msg = ""
        for (let cred in allUsers) {

            // If creds exist in database, send user as cookie and redirect
            if (allUsers[cred].username === user && allUsers[cred].password === pass) {
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
                        window.location.href = "home"
                    })
                break
            } else {
                msg = "An account for this username and password was not found"
            }
        }
        errorMsg.innerHTML = msg
    }
}


export default class LoginForm extends React.Component {

    constructor(props)  {
        super(props) 
    }

    state = {
        redirect: false,
        username: ""
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/home'/>
        }
    }
    
    submitHandler = (event) => {
        event.preventDefault()
        login()
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
                        <Input type="submit" className="btn btn-primary btn-block submit mt-2 mb-2"></Input>
                    </FormGroup>
                </Form>
            </Container>
        )
    }
}