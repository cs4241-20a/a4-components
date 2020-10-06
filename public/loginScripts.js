
// login react component class
class Login extends React.Component {
  constructor(props) {
    super(props);

    // state to hold the inputs for userName and password
    this.state = {
      userName: '',
      password: '',
    }

    // binding for the login function
    this.login = this.login.bind(this)
  }

  // Function that request for the user to be logged in with their inputted credentials
  login(e) {
    e.preventDefault();

    // alert the user that they need to specify both a username and a password
    if(this.state.userName.toString().trim() == '' || this.state.password.toString().trim() == ''){
      alert("Please input both a username and a password.")
      return false
    }

    // create a json object with all the inputted data
    const json = {userName: this.state.userName, password: this.state.password},
    body = JSON.stringify(json)

    // send the data to the server, on a successful login, redirect to the main todo page
    // if not, alert the user that their password was wrong
    // if a user is already signed in, redirect to that signed in account
    fetch('/login', {
      method:'POST',
      body: body,
      headers:{
        "Content-Type": "application/json"
      }
    })
    .then(async function(response) {
      if (response.status === 200) {
        window.location.href = "index.html"
      }
      else if (response.status == 206) {
        await alert("An account is already signed in. Redirecting you to that signed in account.")
        window.location.href = await "index.html"
      }
      else {
        alert("Password is incorect, please try again.")
      }
    })

    return false
  }

  // render function that creates the UI in HTML for the login page
  render() {
    return (<div>
      <h1>Login - Coursework TODO List</h1>
      <p>
        If you do not have an account, one will be created for you on initial login.
      </p>
      <p>
        (*Passwords are stored as plain text, avoid personal passwords*)
      </p>
      <form className="loginElements">
        <input type='text' id='userName' placeholder="Username" onChange={(e) => this.setState({ userName: e.target.value })}/>
        <input type='password' id='password' placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })}/>
        <button id="loginBtn" onClick={this.login}>Login</button>
      </form>
      <div className="githubElements">
        <img id="githubPic" src="github.png"/>
        <a id="githubLink" href="/auth/github">Github Login</a>
      </div>
    </div>
    )
  }
}

// render the page in the browser
ReactDOM.render(<Login/>, document.querySelector("#login-react"))
