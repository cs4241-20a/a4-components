import React, { Component } from 'react'



export class Test extends Component {
    login = () => {
        const username = "test"
        const password = "abcd"
        fetch("/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(res => console.log(res))
    }

    mongoTest = () => {
        fetch("/mongoTest", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            credentials: "include"
        }).then(res => res.json())
        .then(res => console.log(res))
    }
    render() {
        return (
            <div>
                <h1>Test</h1>
                <button className="btn" onClick={this.login}>Login Test</button>
                <button className="btn" onClick={this.mongoTest}>Mongo Test</button>
            </div>
        )
    }
}

export default Test
