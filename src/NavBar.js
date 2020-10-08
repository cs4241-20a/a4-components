import React from 'react'
export default class NavBar extends React.Component {
    signOut() {
        localStorage.clear()
        
        window.location.assign("/") //idk if this will be perm or not.
        fetch('/logout', {
        }).then(response=>console.log(response))
    }
    exampleEventHandler() {
        //this is syntax for event handler.
        //can then use it via this.exampleEventHandler
    }
    //render via handlerName = this.handlerName on whatever i want to (can even be another component)
    render() {
        const links = ['/data', '/tutorial', '#']
        const names = ['My Cards', 'Tutorial', 'Sign Out']
        const navLinks = links.map((link, i)=> {
            return (
                <li className="nav-item">
                  <a className="nav-link" href={link} id={i==2? 'signout': ''} onClick={i==2? this.signOut: null}>{names[i]}</a>
                </li>
            )
        })
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" id="welcome" href="">Welcome back, {this.props.name}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                  {navLinks}
              </ul>
            </div>
          </nav>
        ) 
    }
}