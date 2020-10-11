import React, { Component } from "react";

export class Register extends Component {
  state = {
    username: null,
    password: null,
    email: null,
  };
  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const registerInfo = this.state;
    fetch("/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerInfo),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  render() {
    return (
      <main className="container mainFooterSticky">
        <header>
          <h1 className="pageHeader">Register</h1>
        </header>
        <form onSubmit={this.handleSubmit} action="submit">
          <p>Please fill out the form below to login to your account.</p>
          <label htmlFor="name">First Name</label>
          <input id="name" type="text" onChange={this.handleChange} />
          <label htmlFor="email">Email</label>
          <input id="email" type="email" onChange={this.handleChange} />
          <label htmlFor="username">Username</label>
          <input id="username" type="text" onChange={this.handleChange} />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" onChange={this.handleChange} />
          <div className="right-align">
            <button
              className="btn waves-effect waves-light teal accent-3 black-text formButton"
              type="submit"
              name="action"
              id="login"
            >
              Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
        <p>
          Have an account? <a href="/login">Login</a>
        </p>
      </main>
    );
  }
}

export default Register;
