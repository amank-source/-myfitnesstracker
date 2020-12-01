import React, { useState } from 'react'
import { hitAPI } from '../api'
import './Routines.css';
import RoutineActivities from './RoutineActvities'

const Routines = ({
    routineList,
}) => {
    return (
    <div className='routine-list'>
        <h1>Routines</h1>
        {routineList.map(routine => {
            return <div className='routine'
                          key={routine.id}>
                <h1>{routine.name} by {routine.creatorName}</h1>
                <h2>{routine.goal}</h2>
                <RoutineActivities activityList={routine.activities}
                                   myRoutines={false} 
                                   />
            </div>
        })
        }
    </div>
    )}

export default Routines