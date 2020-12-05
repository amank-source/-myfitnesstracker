import React, { useState, useEffect } from 'react'
import { hitAPI } from '../api'
import './RoutineForm.css'
import ClearIcon from '@material-ui/icons/Clear'
const RoutineForm = (props) => {
  const {
    addNewRoutine,
    activities,
    updateRoutine,
    onclearClick,
    routineId,
  } = props

  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')

  React.useEffect(() => {
    const ac = new AbortController()
    setGoal(props.goal || '')
    setName(props.name || '')
    return () => ac.abort()
  }, [routineId])

  return (
    <div className="modal-routine">
      <div className="routine-form">
        <ClearIcon onClick={() => onclearClick(false)} />
        <form onSubmit={(event) => event.preventDefault()}>
          <input
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value)
            }}
            placeholder="Name of Routine"
          />
          <input
            type="text"
            value={goal}
            onChange={(event) => {
              setGoal(event.target.value)
            }}
            placeholder="Goal of Routine"
          />
          <button
            onClick={async () => {
              const payload = {
                name,
                goal,
                isPublic: true,
              }
              if (routineId) {
                try {
                  const editedRoutine = await hitAPI(
                    'PATCH',
                    `/routines/${routineId}`,
                    payload,
                  )
                  editedRoutine.activities = activities
                  updateRoutine(editedRoutine)
                  onclearClick(null)
                } catch (error) {
                  console.log(error)
                }
              } else {
                try {
                  const newRoutine = await hitAPI('POST', '/routines', payload)
                  newRoutine.activities = []
                  addNewRoutine(newRoutine)
                } catch (error) {
                  console.log(error)
                }
                onclearClick(false)
                setName('')
                setGoal('')
              }
            }}
          >
            {routineId ? 'Update Routine' : 'Create Routine'}
          </button>
        </form>
      </div>
    </div>
  )
}
export default RoutineForm
