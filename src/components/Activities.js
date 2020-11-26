import React, { useState, Fragment } from 'react'
import './Activity.css'
import CreateIcon from '@material-ui/icons/Create'
import Button from '@material-ui/core/Button'
import NewActivity from './NewActivity'

function Activities(props) {
  const {
    activitiesList,
    setActivities,
    isLoggedIn,
    addActivity,
    updateActivity,
  } = props
  const [newActivity, setNewActivity] = useState(false)
  const [editActvity, setEditActivity] = useState(null)

  const styles = {
    largeIcon: {
      width: 60,
      height: 60,
    },
  }

  return (
    <div className="activities">
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

      {activitiesList.map((activity, idx) => {
        return (
          <div
            className="activity-card"
            key={idx}
            onClick={() => {
              console.log(activity)
            }}
          >
            <h3>Name: {activity.name}</h3>
            <p>description: {activity.description}</p>

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
                  backgroundColor: 'rgb(119, 119, 197)',
                  color: 'white',
                  marginTop: '10px',
                  alignItems: 'center',
                  width: '100%',

                  height: '40px',
                  fontSize: '20px',
                  zIndex: '-1',
                }}
                onClick={() => setEditActivity(activity.id)}
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
