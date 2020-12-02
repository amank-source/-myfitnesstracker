import React, { Fragment } from 'react'

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
    <div className="routineforactivity">
      {routineList.map((routine, idx) => {
        return (
          <div key={idx}>
            {activityCheck() ? (
              <Fragment>
                {activityCheck().map((idx) => {
                  return (
                    <Fragment key={idx}>
                      <h1>
                        {routine.name} by {routine.creatorName}
                      </h1>

                      <p>{routine.goal}</p>
                    </Fragment>
                  )
                })}
              </Fragment>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export default RoutinesForActivity
