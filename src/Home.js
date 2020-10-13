import React, { Component } from 'react'
import Upload from "./Upload";
import Demo from "./Demo";
import Songs from "./Songs"
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
            <main className="container mainFooterSticky">
                <header>
                    <h2 className="pageHeader">Home</h2>
                </header>                    
                <button className="btn" onClick={this.login}>Auth?</button>
                <Upload />
                <Demo />
                <Songs />
            </main>
        )
    }
}

export default Home
