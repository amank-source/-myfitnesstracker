import React, { useState } from 'react'
import './Routines.css'
import RoutineByCreator from './RoutinesByCreator'

export const RoutineActivities = ({ activityList }) => {
  const [showActivities, setShowActivities] = useState(false)

  return (
    <div className="routine-activities">
      <h2>Activities</h2>
      {showActivities ? (
        <button
          onClick={() => {
            setShowActivities(false)
          }}
        >
          Hide Activities
        </button>
      ) : null}
      <ol>
        {showActivities ? (
          activityList.map((activity) => {
            return (
              <li key={activity.id}>
                <div className="routine-activity" key={activity.id}>
                  <h3>{activity.name}</h3>
                  <h4>{activity.description}</h4>
                  <p>
                    Rep Count: {activity.count}, Duration: {activity.duration}
                  </p>
                </div>
              </li>
            )
          })
        ) : (
          <button
            className="show-act"
            onClick={() => {
              setShowActivities(true)
            }}
          >
            Show Activities
          </button>
        )}
      </ol>
    </div>
  )
}

const Routines = ({ routineList }) => {
  const [routinesOfCreator, setRoutineOfCreator] = useState(null)
  return (
    <div className="routine-list">
      <h1>Routines</h1>
      {routineList.map((routine) => {
        return (
          <div className="routine" key={routine.id}>
            <h1>
              {routine.name} by 
               <span
                onClick={() => {
                  setRoutineOfCreator(routine.creatorName)
                }}
              >
              {routine.creatorName}
              </span>
            </h1>
            <h2>{routine.goal}</h2>
            {routinesOfCreator === routine.creatorName ? (
              <RoutineByCreator
                routineList={routineList}
                creatorName={routine.creatorName}
                onCloseRoutine={() => setRoutineOfCreator(null)}
              />
            ) : null}
            <RoutineActivities activityList={routine.activities} />
          </div>
        )
      })}
    </div>
  )
}

export default Routines
