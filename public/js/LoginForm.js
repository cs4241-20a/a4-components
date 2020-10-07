class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.username = React.createRef()
    this.password = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    let user = {
      "username": this.username.current.value,
      "password": this.password.current.value
    }
    console.log(user)

    let body = JSON.stringify(user)
    console.log(body)
    fetch('/login', {
      method: 'POST',
      body,
      headers: {
        "Content-Type": "application/json"
      }
    })

      .then(response => response.json())
      .then(login => {
        console.log(login)
        if (login.login === "good") {
          window.location = "/index"
        } else {
          alert("You are wrong.")
          console.log("No.")
        }

      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
            <input
            // defaultValue="Username"
            ref={this.username} />
        </label>
        <label>
          Password:
            <input
            // defaultValue="Password"
            ref={this.password} />
        </label>
        <button>
          Log In
          </button>
          <h3> Note: If you do not have an account currently entering your information will create an account </h3>
      </form>
    );
  }
}


ReactDOM.render(
  <LoginForm />,
  document.getElementById('login')
);