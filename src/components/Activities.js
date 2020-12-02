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
                activitiesList={activitiesList}
                onclose={() => setEditActivity(false)}
              />
            ) : null}
            {isLoggedIn ? (
              <Button
                style={{
                  backgroundColor: 'rgb(119, 119, 197)',
                  color: 'white',
                  margin: '10px',
                  alignItems: 'center',
                  width: '90%',
                }}
                onClick={() => setEditActivity(activity.id)}
              >
                Edit
              </Button>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export default Activities
