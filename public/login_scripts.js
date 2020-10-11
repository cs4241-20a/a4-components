class Login extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
    }
    this.login = this.login.bind(this)
  }

  login(e) {
    e.preventDefault();

    if(this.state.username.toString().trim() === '' || this.state.password.toString().trim() === ''){
      alert("Please enter a valid username and password");
      return false;
    }

    const json = { username: this.state.name, password: this.state.password},
    body = JSON.stringify(json);

    console.log(body)
    fetch('/login', {
      method:'POST',
      body: body,
      headers:{
        "Content-Type": "application/json"
      }
    })
    .then(async response => {
      if(response.ok){
        window.location.href = "index.html"
      } else {
        throw new Error('Network response was not ok');
      }
    });
    return false
  };

  logout(e) {
    fetch("/logout")
  };

  render(){
    return (<div>
      <form action="">
      <h1 className="title">TODO - Login</h1>

      <label htmlFor="UsersName">
      Username
      <input type='text' onChange={(e) => this.setState({username: e.target.value})} id='username' placeholder=""/>
      </label>

      <label htmlFor="UsersPassword">
      Password
      <input type='text' onChange={(e) => this.setState({password: e.target.value})} id='password' placeholder=""/>
      </label>
      </form>

      <button onClick={this.login} id="loginBtn">Login</button>
      <div> </div>
      <a href="/auth/github" className="button">Sign in with GitHub</a>
      </div>
    )
  }
}

ReactDOM.render(<Login/>, document.querySelector("#login"))
