import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './Header'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Login from './Login'
import { getToken, clearToken } from '../api/index'
import { hitAPI } from '../api/index'
import Activities from './Activities'
import Home from './Home'
import NewActivity from './NewActivity'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken())
  const [activitiesList, setActivitiesList] = useState([])

  function updateActivity(updatedAct) {
    let index = activitiesList.findIndex((activity) => {
      return activity.id === updatedAct.id
    })
    if (index > -1) {
      let activityList = [...activitiesList]
      activityList[index] = updatedAct
      setActivitiesList(activityList)
    }
  }

  const addActivity = (newActivity) => {
    return setActivitiesList([newActivity, ...activitiesList])
  }

  useEffect(() => {
    hitAPI('GET', '/activities')
      .then((data) => {
        console.log(data)
        setActivitiesList(data)
      })
      .catch(console.error)
  }, [isLoggedIn])

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

            <Activities
              isLoggedIn={isLoggedIn}
              activitiesList={activitiesList}
              setActivitiesList={setActivitiesList}
              addActivity={addActivity}
              updateActivity={updateActivity}
            />

            <NewActivity activitiesList={activitiesList} />
          </Route>
          <Route path="/">
            <Header
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              clearToken={clearToken}
            />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
