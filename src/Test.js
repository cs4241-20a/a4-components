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
    render() {
        return (
            <div>
                <h1>Test</h1>
                <button onClick={this.login}>Login Test</button>
            </div>
        )
    }
}

export default Test
