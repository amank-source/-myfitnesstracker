import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './Header'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Login from './Login'
import { getToken, clearToken } from '../api/index'
import { hitAPI } from '../api/index'
import Activities from './Activities'
import Routines from './Routines'
import MyRoutines from './MyRoutines'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken())
  const [routineList, setRoutineList] = useState([]);
  const [user, setUser] = useState({});

  function filterMyRoutines() {
    return routineList.filter((routine) => {
      return routine.creatorName === user;
    })
  }

  useEffect(() => {
    async function fetchData() {
        const resp = await hitAPI('GET', '/routines')
        setRoutineList(resp)
    }
        fetchData();
        }, [isLoggedIn])


  return (
    <Router>
      <div className="app">
        <Switch>
            <Route path="/login">
              <Login setIsLoggedIn={setIsLoggedIn}
                     setUser={ setUser } />
            </Route>

            <Route path="/activities">
                <Header
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  clearToken={clearToken}
                />

                <Activities />
            </Route>
            <Route path="/routines">
              <Header
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                clearToken={clearToken}
              />

              <Routines routineList={ routineList } />
            </Route>
            <Route>
              <Header
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  clearToken={clearToken}
                />

                <MyRoutines routineList={ filterMyRoutines() }
                            setRoutineList={ setRoutineList }
                            isLoggedIn={isLoggedIn}
                            user={ user }
                            setUser={ setUser }/>
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
