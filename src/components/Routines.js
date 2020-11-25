import React, { useState } from 'react'
import './Routines.css';

const Routine = ({
    routineList
}) => {
    const [showActivities, setShowActivities] = useState(false);


    return (
    <div className='routine-list'>
        <h1>Routines</h1>
        {routineList.map(routine => {
            return <div className='routine'
                        key={routine.id}>
                <h1>{routine.name} by {routine.creatorName}</h1>
                <h2>{routine.goal}</h2>

                <div className='routine-activities'>
                    <h2>Activities</h2>
                    {showActivities ? <button onClick={() => {
                        setShowActivities(false);
                    }}>Hide Activities</button> : null}
                    {showActivities ? 
                    routine.activities.map(activity => {
                        return   <div className='routine-activity'
                                      key={activity.id}>
                        <h3>{activity.name}</h3>
                        <h4>{activity.description}</h4>
                        <p>Rep Count: {activity.count}, Duration: {activity.duration}</p>
                    </div>
                    }) 
                    : <button onClick={() => {
                        setShowActivities(true)
                    }}>Show Activities</button>
                    } 
                </div>
            </div>
        })

        }
    </div>
    )}

export default Routine