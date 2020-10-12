import React from 'react'

// authenticate = async () => {
//     const response = await fetch('/auth/github')
//     const body = await response.json()
//     console.log(body)
// }

async function callAuth () {
    console.log("hi")
    const response = await fetch('/auth/github')
    console.log("response = " + response)
    const body = await response.json()
    console.log(body)
}

function chooseText () {
    if (window.location.pathname === "/") {
        return (
            <div className="col-sm-12 text-center mt-5 mb-5">
                <a href="/auth/github" onClick={callAuth}>Log In with OAuth 2.0 Provider</a>
                <p>Don't have an account? <a href="signup">Sign up here.</a></p>
            </div>
        )
    } else if (window.location.pathname === "/signup") {
        return (
            <div className="col-sm-12 text-center mt-5 mb-5">
                <p>Already have an account? <a href="/">Log in here.</a></p>
            </div>
        )        
    }

}

export default class AltLogin extends React.Component {
    render() {
        return (
            chooseText()
        )
    }
}