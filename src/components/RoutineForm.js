import React, { useState, useEffect } from 'react'
import { hitAPI } from '../api'

const RoutineForm = (props) => {
  const { addNewRoutine, id, updateRoutine, setEditRoutine } = props
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')

  useEffect(() => {
    setGoal(props.goal || '')
    setName(props.name || '')
  }, [id])

  return (
    <div className="routine-form">
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

            if (id) {
              try {
                const editedRoutine = await hitAPI(
                  'PATCH',
                  `/routines/${id}`,
                  payload,
                )
                updateRoutine(editedRoutine)
                setEditRoutine({})
              } catch (error) {
                console.log(error)
              }
            } else {
              try {
                const newRoutine = await hitAPI('POST', '/routines', payload)
                addNewRoutine(newRoutine)
              } catch (error) {
                console.log(error)
              }
            }
            setName('')
            setGoal('')
          }}
        >
          {id ? 'Edit Routine' : 'Create Routine'}
        </button>
      </form>
    </div>
  )
}

export default RoutineForm
