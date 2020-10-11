import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/" className="navbar-brand">MyReadingList</Link>
            <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
              <Link to="/" className="nav-link">Book List</Link>
              </li>
              <li className="navbar-item">
              <Link to="/create" className="nav-link">Add a new Book</Link>
              </li>
              <li className="navbar-item">
              <Link to="/sign-up" className="nav-link">Sign up</Link>
              </li>
              <li className="navbar-item">
              <Link to="/sign-in" className="nav-link">Sign in</Link>
              </li>
            </ul>
            </div>
          </nav>
        )
    }
}
