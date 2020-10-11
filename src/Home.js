import React, { Component } from 'react'

export class Home extends Component {
    login = () => {
        fetch("/authStatus", {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        }).then(res => res.json())
        .then(res => console.log(res))
    }
    render() {
        return (
            <div>
                <h1>Home</h1>
                <button className="btn" onClick={this.login}>Auth?</button>
            </div>
        )
    }
}

export default Home
