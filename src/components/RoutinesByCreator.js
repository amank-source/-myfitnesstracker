import React, { Fragment } from 'react'
import ClearIcon from '@material-ui/icons/Clear'
import './RoutinesByCreator.css'

function RoutinesByCreator(props) {
  const { routineList, creatorName, onCloseRoutine } = props
  return (
    <div className="routinebyCreModal">
      <div className="routinebycreator">
        <ClearIcon onClick={() => onCloseRoutine(null)} />
        {routineList.map((routine, idx) => {
          return (
            <div className="rout" key={idx}>
              {routine.creatorName === creatorName ? (
                <Fragment>
                  <h1>
                    {routine.name} by
                    <span>{routine.creatorName}</span>
                  </h1>
                  <h2>{routine.goal}</h2>
                </Fragment>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RoutinesByCreator
