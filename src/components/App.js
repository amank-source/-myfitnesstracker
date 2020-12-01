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
import RoutineForm from './RoutineForm'
import Home from './Home'
import NewActivity from './NewActivity'



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken())
  const [activitiesList, setActivitiesList] = useState([])
  const [routineList, setRoutineList] = useState([]);
  const [user, setUser] = useState({});
  const [editRoutine, setEditRoutine] = useState({});
  const [editRoutineAct, setEditRoutineAct] = useState({});
  const [showRoutForm, setShowRoutForm] = useState(false)


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

  function updateRoutine(updatedRoutine) {
    let index = routineList.findIndex((routine) => {
      return routine.id === updatedRoutine.id
    })
    if (index > -1) {
      let newList = [...routineList]
      newList[index] = updatedRoutine
      setRoutineList(newList)
    }
  }

  const addActivity = (newActivity) => {
    return setActivitiesList([newActivity, ...activitiesList])
  }

  const addNewRoutine = (newRoutine) => {
    return setRoutineList([newRoutine, ...routineList])
}


  useEffect(() => {
    hitAPI('GET', '/activities')
      .then((data) => {
        console.log(data)
        setActivitiesList(data)
      })
      .catch(console.error)
  }, [isLoggedIn])

  useEffect(() => {
    hitAPI('GET', '/routines')
      .then((data) => {
        console.log(data)
        setRoutineList(data)
      })
      .catch(console.error)
  }, [isLoggedIn])

  useEffect(() => {
    hitAPI('GET', '/users/me')
      .then((data) => {
        console.log(data)
        setUser(data.id)
      })
      .catch(console.error)
  }, [isLoggedIn])

  
  return (
    <Router>
      <div className="app">
      <Header
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              clearToken={clearToken}
            />
        <Switch>
            <Route path="/login">
              <Login setIsLoggedIn={setIsLoggedIn}
                     setUser={setUser} />
            </Route>

          <Route path="/activities">

            <Activities
              isLoggedIn={isLoggedIn}
              activitiesList={activitiesList}
              setActivitiesList={setActivitiesList}
              addActivity={addActivity}
              updateActivity={updateActivity}
            />
             <NewActivity activitiesList={activitiesList} />     
            </Route>
            <Route path='/myroutines'>
                {showRoutForm ?
                <RoutineForm addNewRoutine={addNewRoutine}
                             {...editRoutine}
                             updateRoutine={updateRoutine}
                             setEditRoutine={setEditRoutine}
                             /> : <button onClick={() => {

                             }}>Create Routine</button>
                             }

                <MyRoutines routineList={ routineList }
                            setRoutineList={ setRoutineList }
                            isLoggedIn={isLoggedIn}
                            setEditRoutine={setEditRoutine}
                            user={user}
                            setEditRoutineAct={setEditRoutineAct}
                            editRoutineAct={editRoutineAct}
                            activitiesList={activitiesList}
                                />
            </Route> : 
            <Route path="/routines">
              <Routines routineList={routineList}
                        setEditRoutineAct={setEditRoutineAct}
                        editRoutineAct={editRoutineAct}
                         />
            </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
