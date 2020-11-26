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
    onCloseEdit,
  } = props
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  useEffect(() => {
    setName(props.name || '')
    setDescription(props.description || '')
  }, [activityId])

  console.log(activityId)

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
            onChange={(e) => setName(e.target.value)}
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

        {activityId ? (
          <Button
            style={{
              backgroundColor: 'blue',
              color: 'white',
            }}
            className="activity-buttonnew"
            onClick={async () => {
              try {
                const objBody = {
                  name,
                  description,
                }
                const result = await hitAPI(
                  'PATCH',
                  `/activities/${activityId}`,
                  objBody,
                )

                updateActivity(result)

                onclose(false)
              } catch (error) {
                console.log(error)
              }
            }}
          >
            Update
          </Button>
        ) : (
          <Button
            style={{ backgroundColor: 'blue', color: 'white' }}
            className="activity-buttonnew"
            onClick={async () => {
              try {
                const objBody = {
                  name,
                  description,
                }
                const result = await hitAPI('POST', '/activities', objBody)

                addActivity(result)
                onclose(false)
              } catch (error) {
                console.error(error)
              }
            }}
          >
            submit
          </Button>
        )}
      </div>
    </div>
  )
}

export default NewActivity
