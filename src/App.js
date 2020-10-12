import React from 'react';
import logo from './logo.svg';
import './App.css';
import FontAwesome from 'react-fontawesome'
import 'font-awesome/css/font-awesome.min.css';
import { LOADIPHLPAPI } from 'dns';
import P from 'pino';

class CreatureForm extends React.Component {
  render() {
    return(
      <h1>Form</h1>
    )
  }

}

class LoginForm extends React.Component {
  constructor(props) {
    super( props)
    this.state = {
      input_password:"",
      input_username:"",
    }
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  handleClick = (e) => {
    e.preventDefault();
    if(this.state.input_username.trim() === '' || this.state.input_password.trim() === '') {
      window.alert("Please enter both a username and password.")
      return false
    }


    const json = {userName: this.state.input_username, password: this.state.input_password},
    body = JSON.stringify(json)

    fetch('/login', {
        method:'POST',
        body,
        headers: {
            "Content-Type":"application/json"
        }
    })
    .then((res) =>{
      if(res.status === 200 || res.status === 206) {
        // make visible
        this.props.loginCallback()

      }
      else {
        alert("Password incorrect,  please try again.")
      }})

  }

  

  render() {
    return(
      <div>
        <h1>Login - Ray's Initiative Tracker</h1>
        <p>
          If you try to login without an account, one will be created for you on initial login.
        </p>
        <p>
            (*Please do not use personal passwords, they are stored as plaintext*)
        </p>
        <form class="loginElements">
          <input type='text' name='input_username' placeholder='Username' onChange={e => this.handleChange(e)} />
          <input type='password' name='input_password' placeholder='Password' onChange={e => this.handleChange(e)} />
          <button id='loginBtn' onClick={e => this.handleClick(e)}>Login</button>
        </form>
      </div>
    )
  }




}


class Creature extends React.Component {

  moveCreature = (e, dir) => {
    e.preventDefault();
    const id = e.target.getAttribute("id");
    const order = e.target.getAttribute("order")

    const json = {movedir: dir, id, order},
        body = JSON.stringify(json);

        fetch('/move', {
            method:'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then( resjson => this.props.getAllCallback(resjson))
  }

  removeCreature = (e) => {
    e.preventDefault();
    //console.log("Delete")
    const _id = this.props._id;
    const order = this.props.order;

    const json = {delete: 'delete', _id, order},
    body = JSON.stringify(json);

    fetch('/remove', {
        method:'POST',
        body,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( response => response.json() )
    .then(json => this.props.getAllCallback(json))
  }

  handleClick = (e) => {
    e.preventDefault()
    //console.log("click")
    if(e.target && e.target.classList.contains("delete")) {
      this.removeCreature(e)

    }
    if(e.target && e.target.classList.contains("moveUp")) {
      this.moveCreature(e, -1)
      
    }
    if(e.target && e.target.classList.contains("moveDown")) {
      this.moveCreature(e, 1)

    }
      
  }
  render() {
    return(

      <tr>
        <td>{this.props._id}</td>
        <td>{this.props.order}</td>
        <td>{this.props.name}</td>
        <td>{this.props.num}</td>
        <td>{this.props.hp}</td>
        <td>{this.props.ac}</td>
        <td><FontAwesome className="moveDown fas fa-angle-double-up" id={this.props._id} 
        order={this.props.order} onClick={e => this.handleClick(e)} /></td>
        <td><FontAwesome className="moveUp fas fa-angle-double-down" id={this.props._id} 
        order={this.props.order} onClick={e => this.handleClick(e)} /></td>
        <td><FontAwesome className="delete fas fa-trash-o" id={this.props._id} 
        order={this.props.order} onClick={e => this.handleClick(e)} /></td>
      </tr>
    )
  }
}


class App extends React.Component {
  constructor(props) {
    super( props)
    this.checkbox = React.createRef();
    this.initbonusBox = React.createRef();
    this.initiativeBox = React.createRef();
    this.appBox = React.createRef();
    this.loginBox = React.createRef();
    this.state = {
      creatures: [],
      input_name: '',
      input_hp: 0,
      input_ac: 0,
      input_initiative: 0,
      input_should_roll: false,
    }
    this.load()
  }

  load = () => {
    fetch( '/appdata', {method: 'GET', 'no-cors':true})
    .then( response => response.json() )
    .then( json => {
      //console.log(json)
      this.setState({ creatures: json})
    })
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  switchRoll = (e) => {
      var bonus = this.initbonusBox.current
      var init = this.initiativeBox.current
      if(e.target.checked === true) {
          init.style.display = "none"
          bonus.style.display = "block"
      } else {
          bonus.style.display = "none"
          init.style.display = "block"
      }
  }

  updateCreatures = (newCreatures) => {
    this.setState({
      creatures: newCreatures
    })
  }


  submit = function(e) {
    e.preventDefault()

    if(this.state.input_name === "" || this.state.input_ac === "" ||
    this.state.input_initiative === "" || this.state.input_hp ===""){
        window.alert("Please fill in all of the fields.")
        return false
    }

    var init;
    if(this.checkbox.current.checked) {
      //console.log("SHOULD ROLL")
        init = parseInt(this.state.input_initiative) + this.getRandomInt(20)
    } else {
      //console.log("SHOULD NOT ROLL")
        init = parseInt(this.state.input_initiative)
    }

    const json = {name: this.state.input_name, num: init, 
        ac:this.state.input_ac, hp: this.state.input_hp}
    const body = JSON.stringify( json)

    fetch( '/add' , {
        method:'POST',
        body,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( response => response.json())
    .then( resjson => this.processJSON(resjson))
  }
  processJSON = (json) => {
    //console.log(json)
    // set state
    this.setState({
        input_name: '',
        input_hp: 0,
        input_ac: 0,
        input_initiative: 0,
        creatures: json
    })
  }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max)) + 1
  }

  login = () => {
    this.loginBox.current.style.display = "none";
    this.appBox.current.style.display = "grid";
    this.load()

  }

  render() {
    return (
      <div>
        <div ref={this.loginBox} style={{diaplay: "block"}}>
          <LoginForm   loginCallback={this.login} />
        </div>

      <div className="appcontainer" ref={this.appBox} style={{display:"none"}}>
        
        <h1>Raymond's Initiative Tracker</h1>
        <p id="note">Note: up/down arrows are only for resolving ties.</p>
        <form >
          <h2>Enter New Creature</h2>
          <label>Creature Name</label>
          <input type="text" id="name" name="input_name" value={this.state.input_name} onChange={e => this.handleChange(e)} /><br />
          <label>Max Hit Points</label>
          <input type="number" id="hp" name="input_hp" value={this.state.input_hp} onChange={e => this.handleChange(e)} /><br />
          <label>Armor Class</label>
          <input type="number" id="ac" name="input_ac" value={this.state.input_ac} onChange={e => this.handleChange(e)} /><br />
          <label>Roll?</label>
          <input ref={this.checkbox} type="checkbox" id="roll" name="input_should_roll" value={this.state.input_should_roll} onClick={e => this.switchRoll(e)} onChange={e => this.handleChange(e)} />
          <div ref={this.initbonusBox} style={{display:"none"}}>
              <label>Initiative Bonus</label>
              <input type="number" id="initbonus" name="input_initiative" value={this.state.input_initiative} onChange={e => this.handleChange(e)} />
              <p>ex +3, -2, 5</p>
          </div>
          <div ref={this.initiativeBox} style={{display:"block"}}>
              <label>Initiative</label>
              <input type="number" id="initiative" name="input_initiative" value={this.state.input_initiative} onChange={e => this.handleChange(e)} /><br />
              </div>

          <button class="button" onClick={e => this.submit(e)}>Add Creature</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Turn</th>
              <th>Name</th>
              <th>Initiative</th>
              <th>HP</th>
              <th>AC</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.creatures.map( (creature, i) => <Creature _id={creature._id} 
            order={creature.order} name={creature.name} num={creature.num} hp={creature.hp} 
            ac={creature.ac} getAllCallback={this.updateCreatures} />)}
          </tbody>
        </table>
      </div>
      </div>
    );
  }
}

export default App;
