import React from 'react'
import { Button } from '@material-ui/core';
import Datcord from './images/datcord.png';
import './Login.scss'

function Login({ signIn }) {
  
  return (
    <div className="login">
      <div className="login__logo">
        <img className="login__image" src={Datcord} alt="Discord"/>
      </div>

      <Button className="login__signInButton" onClick={signIn}>Sign In</Button>
    </div>
  )
}

export default Login
