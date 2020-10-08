import React from "react";
import axios from "axios"
//checks if the password is 8> characters, has at least 1 capital, 1 lowercase, and 1 number.
const isValidPassword = function(pw) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(pw)
}
const isValidEmail = function(e) {
    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    return regex.test(e)
}
//signup starts disabled, is enabled when conditions are met.
const checkValiditySignUp = function() {
    const pw = document.querySelector('#password').value
    if(isValidPassword(pw) && pw==document.querySelector('#confirmpassword').value && isValidEmail(document.querySelector('#emailaddress').value)&&document.querySelector('#username')!='') {
        document.querySelector('#signup').disabled = false
    } else {
        document.querySelector('#signup').disabled = true
    }
}
//signin starts disabled, is enabled when conditions are met.
const checkValidityLogIn = function() {
    if(document.querySelector('#usernamelogin').value!=''&&document.querySelector('#passwordlogin').value!='') {
        document.querySelector('#login').disabled = false
    } else {
        document.querySelector('#login').disabled = true
    }
}

export default class Home extends React.Component {
    //function called when hit signup button. sends request to server!
signUp(e) {
    e.preventDefault()
    const inputs = document.getElementsByClassName('signUpFields')
    if(inputs[2].value!=inputs[3].value) {
        alert('Error: passwords do not match')
        console.log('Error: passwords do not match')
        return false
    }
    if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(inputs[2].value))){
        alert('Error: password is too weak. Need 8 or more characters, at least 1 lowercase, uppercase, and number')
        console.log('ERROR: weak password')
        return false
    }
    console.log(inputs)
    axios.post('/signup', {email:inputs[0].value,username:inputs[1].value,password:inputs[2].value,isSubscribed:(inputs[4].checked)})
      .then(json => {
          if(json.status=="failure") {
              alert('error: user already exists!')
              Array.prototype.slice.call( inputs ).map(i=>i.value='')
          } else {
              alert('Successfully signed up. (you may now log in)')
              Array.prototype.slice.call( inputs ).map(i=>i.value='') 
              //clear fields
          }})
}
//function called when hit login button. sends request to server!
logIn(e) {
    e.preventDefault()
    const inputs = document.getElementsByClassName("loginFields")
    axios.post('/login', {username:inputs[0].value, password:inputs[1].value})
    .then(data => {
        const json = data.data
        Array.prototype.slice.call( inputs ).map(i=>i.value='')
        if(json.status=='success') {
            console.log("LOGIN succeeded")
            alert('Login successful')
            window.localStorage.setItem('username', json.username)
            window.location.assign('data')
            
        } else {
            console.log('LOGIN FAILED')
            alert('Login failed (check username/password)')
        }
    })

}
    passWordSignup() {
        //instead of querySelector, might be able to directly refrence or use this
        if(!isValidPassword(document.querySelector('#password').value)) {
            alert('password is too weak. a strong password has 8 or more characters, at least 1 capital letter, lowercase letter, and number.')
        }
        checkValiditySignUp()
    }
    emailAddressSignup() {
        console.log(this)
        if(!isValidEmail(document.querySelector('#emailaddress').value)) {
            alert('invalid email address. use the format example@domain.com')
        }
        checkValiditySignUp()
    }
    confirmPasswordSignup() {
        if(document.querySelector('#confirmpassword').value!=document.querySelector('#password').value) {
            alert('passwords do not match!')
        }
        checkValiditySignUp()
    }
    userNameSignup() { checkValiditySignUp() }
    userNameLogin() { checkValidityLogIn() }
    passWordLogin() { checkValidityLogIn() }
    state = {
        fields: [],
      };
      //this method, is the method I am going to need for updating data.
      //or manipulating data.
      //or maybe i can just handle that not in this method
      //but if i want to UPDATE stuff this is a great method to use.
      /*
        EDIT:
        What I will do:
        when I read the DB, I will add to the state with the list of cards.
        and this will cause an UPDATE.
        and in that UPDATE i will change the code!
      */
     componentDidUpdate(prevProps) {

     }
      componentDidMount() {
        axios.get("/fields.json").then((response) => {
          this.setState({ fields: response.data });
        });
      }
      //can use this.setState for handling how to change data!
    render() {
        const signupFuncs = [this.emailAddressSignup.bind(this), this.userNameSignup, this.passWordSignup, this.confirmPasswordSignup]
        const {fields } = this.state;
        return (
            <div className="container" onLoad={()=> {
                document.querySelector('#login').disabled = true
                document.querySelector('#signup').disabled = true
            }}>
            <div className="jumbotron">
                <h1>MTG Custom Card Creator</h1>
            </div>
            <div className="row justify-content-center">
                <div className="col-sm-6 text-right">
                    <h2>New User? Register below</h2><br/>
                    <form>
                        {fields.map((field, i) => 
                        (
                            <div>
                                <label for={field.id}>{field.name}</label>
                                <input type={field.type} className="signUpFields" id={field.id} name={field.id} onBlur={i<4? signupFuncs[i]: null}/>
                                <br/>
                            </div>
                        )
                        )}
                        <button type="button" class="btn btn-lg btn-primary" id="signup" onClick={this.signUp}>Signup</button>
                    </form>
                </div>
                <div className="col-sm-6 text-right">
                    <h2>Returning user? Sign in below</h2><br/>
                    <form>
                        <label for="usernamelogin">Username</label>
                        <input type="text" className="loginFields" id="usernamelogin" name="usernamelogin" onBlur={this.userNameLogin}/><br/>
                        <label for="passwordlogin">Password</label>
                        <input type="password" className="loginFields" id="passwordlogin" name="passwordlogin" onBlur={this.passWordLogin}/><br/><br/>
                        <button type="button" className="btn btn-lg btn-primary" id="login" onClick={this.logIn}>Sign In</button><br/><br/>
                    </form>
                    <a role="button" aria-pressed="true" className="btn btn-lg btn-primary" href="https://github.com/login/oauth/authorize?client_id=bb174328d123ef3f1aa0&scope=gist">Sign In using Github</a><br/>
                    <form>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}//<p class='info'>8 or more characters, at least 1 capital, lowercase, and number</p>