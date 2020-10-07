import React, { Component } from 'react'

export class PasswordChange extends Component {

    submit(){
        let newPass = document.getElementById('password').value;
        let body = JSON.stringify({password: newPass} );
    
        fetch( '/updatePassword', {
          method:'POST',
          body : body,
          headers:{
              "Content-Type": "application/json"
          }
        }).then(function(){
            fetch( '/logOut', {
                method:'POST'
              }).then(() => {
                window.open('/', "_self")
              })
        })
    }

    render() {
        return (
            <div>
                <p id = 'oldPass'></p>
                <input type='text' id='password' placeholder="Password here"/>
                <button onClick={this.submit}>Submit</button>
            </div>
        )
    }
}

export default PasswordChange
