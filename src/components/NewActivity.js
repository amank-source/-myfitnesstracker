import React, { useState, useEffect } from 'react'
import './NewActivity.css'
import Button from '@material-ui/core/Button'
import ClearIcon from '@material-ui/icons/Clear'
import { hitAPI } from '../api'

function NewActivity(props) {
  const {
    addActivity,
    onclose,
    activityId,
    updateActivity,

    activitiesList,
  } = props
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    setName(props.name || '')
    setDescription(props.description || '')
  }, [activityId])

  console.log(activityId)

  function duplicateActivityCheck() {
    for (let i = 0; i < activitiesList.length; i++) {
      let nameCheck = activitiesList[i].name
      if (name === nameCheck) {
        return true
      }
    }
    return false
  }

  return (
    <div className="modal">
      <div className="newActivity">
        <ClearIcon
          style={{ marginLeft: '550px' }}
          onClick={() => onclose(false)}
        />
        <form onSubmit={(e) => e.preventDefault()}>
          <h3>Activity Title </h3>
          <input
            value={name}
            onChange={(e) => {
              setActive(false)
              setName(e.target.value)
            }}
            type="text"
            placeholder="Name goes here.."
          />
          <h3>Activity Description</h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Description goes here..."
          />
        </form>

        {active ? (
          <h5 className="duplicate">{name} already exists</h5>
        ) : (
          <h5>&nbsp;</h5>
        )}

        <Button
          style={{ backgroundColor: 'blue', color: 'white' }}
          className="activity-buttonnew"
          onClick={async () => {
            const objBody = {
              name,
              description,
            }

            if (activityId) {
              try {
                const result = await hitAPI(
                  'PATCH',
                  `/activities/${activityId}`,
                  objBody,
                )

                updateActivity(result)
                onclose(false)
                setActive(false)
              } catch (error) {
                console.error(error)
              }
            } else {
              if (duplicateActivityCheck()) {
                setDescription('')
                setActive(true)
              } else {
                try {
                  const result = await hitAPI('POST', '/activities', objBody)

                  addActivity(result)
                  onclose(false)
                  setActive(false)
                } catch (error) {
                  console.error(error)
                }
              }
            }
          }}
        >
          {activityId ? 'Update' : 'Submit'}
        </Button>
      </div>
    </div>
  )
}

export default NewActivity
