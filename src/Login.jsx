import React from 'react'
import { Button } from '@material-ui/core';
import { auth, provider } from './firebase';
import './Login.scss'

function Login() {
  const signIn = () => {
    // do clever google login shizzz....
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  }
  return (
    <div className="login">
      <div className="login__logo">
        <img className="login__image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Font_Awesome_5_brands_discord_color.svg/1280px-Font_Awesome_5_brands_discord_color.svg.png" alt="Discord"/>
      </div>

      <Button className="login__signInButton" onClick={signIn}>Sign In</Button>
    </div>
  )
}

export default Login
