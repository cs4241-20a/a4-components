import React from 'react';
import ErrorMsg from './common/errMsg';
import SignupForm from './signupForm'
import Header from './common/header'
import AltLogin from './common/altLogin';
import Subtitle from './common/subtitle'

export default class SignupPage extends React.Component {
    render() {
        return (
          <div>
            <Header/>
              <Subtitle text="Create an account to continue"/>
              <SignupForm />
              <ErrorMsg />
              <AltLogin option="signup"/>
          </div>
        )
    }
}