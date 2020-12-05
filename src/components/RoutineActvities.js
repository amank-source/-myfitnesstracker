import React, { useState } from 'react'
import './RoutineActivities.css'

const RoutineActivities = ({
  activityList,
  myRoutines,
  handleDelete,
  setEditRoutineAct,
}) => {
  const [showActivities, setShowActivities] = useState(false)

  return (
    <div className="routine-activities">
      <h2>Activities</h2>
      {showActivities ? (
        <button
          onClick={() => {
            setShowActivities(!showActivities)
          }}
        >
          Hide Activities
        </button>
      ) : (
        <button
          onClick={() => {
            setShowActivities(!showActivities)
          }}
        >
          Show Activities
        </button>
      )}
      <ol>
        {showActivities
          ? activityList?.map((activity) => {
              return (
                <li key={activity.id}>
                  <div className="routine-activity">
                    <h3>{activity.name}</h3>
                    <h4>{activity.description}</h4>
                    <p>
                      Rep Count: {activity.count}, Duration: {activity.duration}
                    </p>
                    {myRoutines ? (
                      <div>
                        <button
                          style={{ zIndex: '-1' }}
                          onClick={() => {
                            handleDelete(activity)
                          }}
                        >
                          Delete
                        </button>
                        <button
                          style={{ zIndex: '-1' }}
                          onClick={() => {
                            setEditRoutineAct(activity)
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    ) : null}
                  </div>
                </li>
              )
            })
          : null}
      </ol>
    </div>
  )
}

export default RoutineActivities
