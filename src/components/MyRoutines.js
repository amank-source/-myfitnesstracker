import React from 'react'
import { hitAPI } from '../api'
import { RoutineActivities } from './Routines'
import './MyRoutines.css'

const MyRoutines = (props) => {
  const { routineList, setRoutineList, setEditRoutine, activitiesList } = props

  const newarrayActivities = () => {
    let newarr = []
    for (let i = 0; i < routineList.length; i++) {
      for (let j = 0; j < routineList[i].activities.length; j++) {
        newarr.push(routineList[i].activities[j])
      }
    }
    console.log(newarr)
    return newarr
  }
  newarrayActivities()

  return (
    <>
      <div className="myroutine-list">
        <h1>My Routines</h1>
        {routineList.map((routine) => {
          console.log(routine.activities)
          return (
            <div className="routine" key={routine.id}>
              <h1>
                {routine.name} by {routine.creatorName}
              </h1>
              <h2>{routine.goal}</h2>
              <div className="options">
                <button
                  onClick={() => {
                    try {
                      hitAPI('DELETE', `/routines/${routine.id}`)
                      setRoutineList(
                        routineList.filter((deleted) => {
                          return routine !== deleted
                        }),
                      )
                    } catch (error) {
                      console.log(error)
                    }
                  }}
                >
                  DELETE
                </button>
                <button
                  onClick={() => {
                    setEditRoutine(routine)
                  }}
                >
                  EDIT
                </button>

                <div className="dropdown">
                  <button className="dropbtn">Add Activity</button>
                  <div className="dropdown-content">
                    {newarrayActivities().map((activity, idx) => {
                      return (
                        <div key={idx}>
                          <h3>{activity.name}</h3>
                          <h4>{activity.description}</h4>
                          <p>
                            Rep Count: {activity.count}, Duration:{' '}
                            {activity.duration}
                          </p>

                          <button
                            onClick={async () => {
                              const result = await hitAPI(
                                'POST',
                                `/routines/${routine.id}/activities`,
                                {
                                  activityId: activity.id,
                                  count: activity.count,
                                  duration: activity.duration,
                                },
                              )
                              console.log(activity.id)
                              console.log(activity.count)
                              console.log(activity.duration)

                              console.log(result)
                            }}
                          >
                            add to activities
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <RoutineActivities activityList={routine.activities} />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default MyRoutines
