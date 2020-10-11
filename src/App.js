import React from 'react';

import './App.css'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import InputGroup from 'react-bootstrap/InputGroup'
import FormGroup from 'react-bootstrap/FormGroup'
import FormControl from 'react-bootstrap/FormControl'
import FormLabel from 'react-bootstrap/FormLabel'

class Todo extends React.Component {
  render() {
    return <React.StrictMode>
    <ListGroupItem >
    <InputGroup>
    <InputGroup.Prepend>
      <InputGroup.Checkbox defaultChecked={this.props.completed} name2={this.props.name} onChange={ e => this.change(e) }/>
    </InputGroup.Prepend>
    {this.props.name}
      </InputGroup>
    </ListGroupItem>
    </React.StrictMode>
  }
  change(e) {
    this.props.onclick( this.props.name, e.target.checked )
  }
}

class App extends React.Component {
  constructor( props ) {
    super( props )
    this.state = { todos:[] }
    this.load()
  }

  load() {
    fetch( '/read', { method:'get', 'no-cors':true })
      .then( response => response.json() )
      .then( json => {
         this.setState({ todos:json }) 
      })
  }

  toggle( name, completed ) {
    fetch( '/update', {
      method:'POST',
      body: JSON.stringify({ name, completed }),
      headers: { 'Content-Type': 'application/json' }
    })
  }
 
  add( evt ) {
    const value = document.querySelector('input').value

    fetch( '/add', { 
      method:'POST',
      body: JSON.stringify({ name:value, completed:false }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {
       this.setState({ todos:json }) 
    })
  }
  
  render() {
    return (
      <React.StrictMode>
      <Container className="App">
  <FormGroup>
  <FormLabel>Enter a todo for today</FormLabel>
  <InputGroup>
    <FormControl size= "lg" type="text" placeholder="Enter a task"></FormControl>
    <InputGroup.Append>
      <Button variant="outline-dark" size="lg" onClick={ e => this.add( e )}>Add</Button>
    </InputGroup.Append>
    </InputGroup>
  </FormGroup>
        <ListGroup size="lg" variant="flush">
          { this.state.todos.map( (todo,i) => <Todo key={i} name={todo.name} completed={todo.completed} onclick={ this.toggle } /> ) }
       </ListGroup> 
      </Container>
      </React.StrictMode>
    )
  }
}

export default App;