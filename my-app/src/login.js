import React from 'react'
import ErrorMsg from './common/errMsg'
import LoginForm from './loginForm'
import Header from './common/header'
import AltLogin from './common/altLogin'
import Subtitle from './common/subtitle'

export default class LoginPage extends React.Component {
    render() {
        return (
          <div>
            <Header/>
            <Subtitle text="Log in to continue"/>
              <LoginForm />
              <ErrorMsg />
              <AltLogin />
          </div>
        )
    }
}