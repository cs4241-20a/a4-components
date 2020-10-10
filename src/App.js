import React from 'react';
import './App.css';

class Dream extends React.Component {
  // our .render() method creates a block of HTML using the .jsx format
  render() {
    return <li id = {this.props.id}>{this.props.name}
      <input type="checkbox" defaultChecked={this.props.completed} name2={this.props.name} onChange={ e => this.change(e) }/>
    </li>
  }

  // call this method when the checkbox for this component is clicked
  change(e) {
    this.props.onclick( this.props.id, e.target.checked )
  }
}

// main component
class App extends React.Component {
  constructor( props ) {
    super( props )
    // initialize our state
    this.state = { dreams:[] }
    this.load()
  }

// load in our data from the server
load() {
  fetch("/dreams")
  .then(response => response.json())
  // parse the JSON from the server
  .then(data => {
    this.setState({ dreams:data }) 
  });
}

  // when an Todo is deleted, send data to server
  delete( id, completed ) {
    console.log(id)
    fetch( '/delete', {
      method:'DELETE',
      body: JSON.stringify({ id, completed }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        window.location.reload();
      })
  }
  
  // add a new todo list
  add( evt ) {
    const value = document.getElementById('add-dream').value
    fetch( '/add', { 
      method:'POST',
      body: JSON.stringify({ dream: value}),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {
        console.log('responds dream:' + json.dream)
        this.setState({ dream: json }) 
        window.location.reload();
    })
  }

  Switch(evt){
    const oldDream = document.getElementById('old-dream').value
    const newDream = document.getElementById('new-dream').value
    fetch('/change', {
      method: 'PUT',
      body: JSON.stringify({
        id: oldDream,
        name: newDream
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json()
        .then(json => {
          document.location.reload()
        }))
  }

  // render component HTML using JSX 
  render() {
    return (
      
      <div className="App">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css"></link>
        <h1>The Dream Database</h1>
        <h3>Add a Dream </h3>
        <tr>
          <th><input id="add-dream" type='text' /></th>
          <th></th>
          <th><button onClick={ e => this.add( e )}>add Dream</button></th>
        </tr>
        <h3>Change your Dream (spelling matters)</h3>
        <tr>
          <th><input id="old-dream" type='text' /></th>
          <th><input id="new-dream" type='text' /></th>
          <th><button onClick={ e => this.Switch( e )}>Change Dream</button></th>
        </tr>
     
        <h3>Click the checkbox to remove dreams</h3>

        <ul>
          {console.log("Dreams: " + this.state.dreams.length)}
          {this.state.dreams.map( (dream,i) => <Dream key={dream._id} name={dream.dream} id = {dream._id} onclick={ this.delete } /> ) }
       </ul> 
      </div>
    )
  }
}

export default App;
