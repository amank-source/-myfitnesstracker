import React, { useState } from 'react'

import { Link, useHistory } from 'react-router-dom'

import { auth, register } from '../api/index'

import './Login.css'

function Login(props) {
  const { setIsLoggedIn } = props
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  return (
    <div className="login">
      <div className="logo-login">
        <Link to="/">
          <img
            className="header-logo"
            src="https://i.imgur.com/yLWR1v4.jpg"
            alt="logo"
          />
        </Link>
      </div>

      <div className="login-container">
        <h1>Sign In</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          <h5>Email</h5>
          {errorMessage ? <h5 className="error">{errorMessage}</h5> : null}
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="username"
          />
          <h5>Password</h5>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="password"
          />
          <button
            className="login-siginbutton"
            onClick={async () => {
              console.log('hello')
              try {
                const data = await auth(username, password)
                console.log(setIsLoggedIn)
                setIsLoggedIn(true)
                history.push('/')
              } catch (error) {
                setErrorMessage(error.message)
              }
            }}
          >
            Sign In
          </button>
          <h5>Have Account? Sign In!</h5>
        </form>

        <button
          className="login-createbutton"
          onClick={async () => {
            try {
              const data = await auth(username, password, true)
              console.log(setIsLoggedIn)
              setIsLoggedIn(true)
              history.push('/')
            } catch (error) {
              setErrorMessage(error.message)
            }
          }}
        >
          Create your account
        </button>
        <h5>Don't have account? Sign Up!</h5>
      </div>
    </div>
  )
}

export default Login
