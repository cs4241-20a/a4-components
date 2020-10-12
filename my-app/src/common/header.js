import React from 'react'
import { Jumbotron } from 'reactstrap'

function logOut () {
    if (window.location.pathname === "/home") {
        return <a style={{position: "absolute", top: "10px", right: "10px", color: "#fff", cursor: "pointer"}} href='/'>Log Out</a>
    }
}

export default class Header extends React.Component {
    render() {
        return (
            <Jumbotron className="text-center" style={{backgroundColor: "#13a2b8", color: "#fff", position: "relative"}}>
                {logOut()}
                <h1>Bill Tracker</h1>
                <h5>The easiest way to manage your bills</h5>
            </Jumbotron>
        )
    }
}
