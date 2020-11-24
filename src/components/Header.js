import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import SearchBar from 'material-ui-search-bar'

import './Header.css'

function Header(props) {
  const { isLoggedIn, setIsLoggedIn, clearToken } = props
  return (
    <div className="header">
      <Link style={{ textDecoration: 'none' }} to="/">
        <h1 className="header-logo">My FitnessPal</h1>
      </Link>
      <div className="header-search">
        <SearchBar
          className="serach-bar"
          style={{ backgroundColor: '#8d8ddd' }}
        />
      </div>
      <div className="header-nav">
        <Link style={{ textDecoration: 'none' }} to="/routines">
          <span className="header-nav-color">Routines</span>
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/myroutines">
          <span className="header-nav-color">My Routines</span>
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/activities">
          <span className="header-nav-color">Activities</span>
        </Link>

        {isLoggedIn ? (
          <Link style={{ textDecoration: 'none' }} to="/">
            <span
              className="header-nav-color"
              onClick={() => {
                clearToken()
                setIsLoggedIn(false)
              }}
            >
              Logout
            </span>
          </Link>
        ) : (
          <Link style={{ textDecoration: 'none' }} to="/login">
            <span className="header-nav-color">SignIn/Sign Up</span>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
