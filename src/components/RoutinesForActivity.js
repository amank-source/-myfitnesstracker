import React, { Fragment } from 'react'
import './RoutineForActivity.css'
import ClearIcon from '@material-ui/icons/Clear'

function RoutinesForActivity(props) {
  const { routineList, onCloseAct, activityName, activitiesList } = props

  const activityCheck = () => {
    let newarr = []
    for (let i = 0; i < routineList.length; i++) {
      for (let j = 0; j < routineList[i].activities.length; j++) {
        let name = routineList[i].activities[j].name
        name = name.toLowerCase()

        if (activityName === name) {
          newarr.push(routineList[i])
        }
      }
    }
    return newarr
  }

  console.log(activityCheck())

  return (
    <div>
      <div>
        {routineList.map((routine, idx) => {
          return (
            <div key={idx}>
              {activityCheck() && activityCheck().length > 0 ? (
                <div className="modal-foractivityRoutine">
                  <div className="routineforactivity">
                    <Fragment>
                      {activityCheck().map((idx) => {
                        return (
                          <div key={idx}>
                            <ClearIcon onClick={() => onCloseAct(null)} />
                            <h1>
                              {routine.name} by {routine.creatorName}
                            </h1>

                            <p>{routine.goal}</p>
                          </div>
                        )
                      })}
                    </Fragment>
                  </div>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RoutinesForActivity
