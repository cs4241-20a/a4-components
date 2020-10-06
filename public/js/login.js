console.log("Welcome to assignment 4!")
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uname: '',
      pw: '',
    }

    this.login = this.login.bind(this);
    this.create = this.create.bind(this);
  }

  login(e) {
    e.preventDefault()

    if (this.state.uname.toString().trim() === '' || this.state.pw.toString().trim() === '') {
      alert("Empty fields.")
      return false
    }

    const json = {
      username: this.state.uname,
      password: this.state.pw
    }

    const body = JSON.stringify(json)
    fetch('/login', {
      method: 'POST',
      body,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json != null) {
          alert("Logging in.")
          window.location.href = "/views/index.html";
        } else {
          alert("This account does not exist. Please create account or enter valid credentials.")
        }
      })

    this.setState({ uname: '' })
    this.setState({ pw: '' })

    return false
  }

  create(e) {
    // prevent default form action from being carried out
    e.preventDefault()

    if (this.state.uname.toString().trim() === '' || this.state.pw.toString().trim() === '') {
      alert("Empty fields.")
      return false
    }

    const json = {
      username: this.state.uname,
      password: this.state.pw
    }

    const body = JSON.stringify(json)
    fetch('/create', {
      method: 'POST',
      body,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        alert("Created account.")
      })

    this.setState({ uname: "" })
    this.setState({ pw: "" })

    window.location.href = "/views/index.html";

    return false
  }


  render() {

    return (
      <div>
        <h1 className="box header">Welcome</h1>

        <div className="box sidebar">
          <h3>Please log in to continue</h3>
          <hr></hr>
          <div className="data-form">
            <form id="form">
              <p><input type='text' id='Username' placeholder="Username" onChange={val => { this.setState({ uname: val.target.value }) }}></input></p>
              <p><input type='password' id='Password' placeholder="Password" onChange={val => { this.setState({ pw: val.target.value }) }}></input></p>
              <p><button id="login-btn" onClick={this.login}>Login</button></p>
              <p><button id="create-btn" onClick={this.create}>Create</button></p>
              <p><a href="/auth/github" className="button">Github Login</a>
              </p>
            </form>
          </div>
        </div>
        <hr></hr>
        <em>Please do not enter sensitive information.</em>
      </div>
    );
  }
}

const domContainer = document.getElementById("react-container");
ReactDOM.render(<App />, domContainer);