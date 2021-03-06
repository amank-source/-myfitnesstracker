import React, { useState, Fragment } from 'react'
import './Activity.css'
import CreateIcon from '@material-ui/icons/Create'
import Button from '@material-ui/core/Button'
import NewActivity from './NewActivity'
import RoutineForActivity from './RoutinesForActivity'

function Activities(props) {
  const {
    activitiesList,
    setActivities,
    isLoggedIn,
    addActivity,
    updateActivity,
    routineList,
  } = props
  const [newActivity, setNewActivity] = useState(false)
  const [editActvity, setEditActivity] = useState(null)
  const [routineforActivity, setRoutineForActivity] = useState(null)

  return (
    <div className="activities">
      {isLoggedIn ? (
        <Fragment>
          <CreateIcon
            style={{
              position: 'fixed',
              bottom: '70px',
              right: '40px',
              fontSize: 'xxxlarge',
            }}
            fontSize="large"
            onClick={() => setNewActivity(true)}
          />

          {newActivity ? (
            <NewActivity
              onclose={() => setNewActivity(false)}
              addActivity={addActivity}
              setNewActivity={setNewActivity}
              newActivity={newActivity}
              activitiesList={activitiesList}
            />
          ) : null}
        </Fragment>
      ) : null}

      {activitiesList?.map((activity, idx) => {
        return (
          <div className="activity-card" key={idx}>
            <h3 onClick={() => setRoutineForActivity(activity.name)}>
              Name: {activity.name}
            </h3>
            <p>description: {activity.description}</p>

            {routineforActivity === activity.name ? (
              <RoutineForActivity
                routineList={routineList}
                activityName={activity.name.toLowerCase()}
                onCloseAct={() => setRoutineForActivity(null)}
                activitiesList={activitiesList}
              />
            ) : null}
            {editActvity === activity.id ? (
              <NewActivity
                activityId={activity.id}
                updateActivity={updateActivity}
                name={activity.name}
                description={activity.description}
                onclose={() => setEditActivity(false)}
              />
            ) : null}

            {isLoggedIn ? (
              <button
                style={{
                  margin: '10px',
                  color: 'white',
                  background: 'rgb(54, 54, 187)',
                  alignItems: 'center',
                  borderRadius: '12px',
                  fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
                  fontWeight: '800',
                  height: '35px',
                  width: '37%',
                  marginLeft: '30%',
                  boxShadow:
                    '0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0)',
                }}
                onClick={() => {
                  setEditActivity(activity.id)
                }}
              >
                Edit
              </button>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export default Activities
