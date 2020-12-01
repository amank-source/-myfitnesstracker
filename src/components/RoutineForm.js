import React, { useState, useEffect } from 'react'
import { hitAPI } from '../api'
import './RoutineForm.css'
import ClearIcon from '@material-ui/icons/Clear'

const RoutineForm = (props) => {
  const {
    addNewRoutine,
    id,
    updateRoutine,
    setEditRoutine,
    onclearClick,
    onclearedit,
    routineId,
    oncloseEdit,
  } = props
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')

  useEffect(() => {
    setGoal(props.goal || '')
    setName(props.name || '')
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

          {routineId ? (
            <button
              onClick={async () => {
                const payload = {
                  name,
                  goal,
                  isPublic: true,
                }

                try {
                  const editedRoutine = await hitAPI(
                    'PATCH',
                    `/routines/${routineId}`,
                    payload,
                  )
                  updateRoutine(editedRoutine)
                  onclearClick(null)
                } catch (error) {
                  console.log(error)
                }
              }}
            >
              Update
            </button>
          ) : (
            <button
              onClick={async () => {
                const payload = {
                  name,
                  goal,
                  isPublic: true,
                }

                try {
                  const newRoutine = await hitAPI('POST', '/routines', payload)
                  addNewRoutine(newRoutine)
                } catch (error) {
                  console.log(error)
                }

                onclearClick(false)
                setName('')
                setGoal('')
              }}
            >
              Create Routine
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default RoutineForm
