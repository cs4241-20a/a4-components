import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import Navbar from './components/Navbar'
import BookList from './components/BookList'
import EditBook from './components/EditBook'
import CreateBook from './components/CreateBook'
import Register from './components/Register'
import Signin from './components/Signin'

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/"exact component={BookList} />
      <Route path="/edit/:id" component={EditBook} />
      <Route path="/create" component={CreateBook} />
      <Route path="/sign-up" component={Register} />
      <Route path="/sign-in" component={Signin} />
    </Router>

  );
}

export default App;
