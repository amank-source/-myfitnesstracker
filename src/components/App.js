import React, { useState } from 'react'
import './App.css'
import Header from './Header'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Login from './Login'
import { getToken, clearToken } from '../api/index'
import { hitAPI, auth } from '../api/index'
import Activities from './Activities'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken())
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login setIsLoggedIn={setIsLoggedIn} />
          </Route>

          <Route path="/activities">
            <Header
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              clearToken={clearToken}
            />

            <Activities />
          </Route>
          <Route path="/">
            <Header
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              clearToken={clearToken}
            />
            <Activities />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
