class App extends React.Component {
    constructor(data) {
        super(data);

        this.state = {
            username: '',
            password: ''
        }
        
    }



    render() {
        return (
            <div className="container">
                <div>
                    <form>
                        <div>
                            <label>Username: </label>
                            <input type='text' id='username' className="input is-rounded" placeholder="Username"/>
                        </div>
                        <div>
                            <label>Password: </label>
                            <input type='password' id='password' placeholder="Password" className="input is-rounded"/>
                        </div>
                        <div className="container has-text-centered">
                            <button id='login' className="button is-large is-success">Login</button>
                            <button id='signUp' className="button is-large is-success">Sign Up</button>
                        </div>
                    </form>
                </div>
                <a href="/auth/github">
                    <img src="images/github-icon.png"/>
                </a>
            </div>
        );
    }

}

ReactDOM.render(<App/>, document.getElementById('react-container'));