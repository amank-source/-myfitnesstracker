import React from 'react';
import { hitAPI } from '../api'
import { RoutineActivities } from './Routines'



const MyRoutines = (props) => {
    const {
        routineList,
        setRoutineList,
        setEditRoutine
    } = props

    return <>
        
        <div className='myroutine-list'>
           <h1>My Routines</h1>
           {routineList.map(routine => {
            return <div className='routine'
                        key={routine.id}>
                <h1>{routine.name} by {routine.creatorName}</h1>
                <h2>{routine.goal}</h2>
                <div className='options'>
                    <button onClick={() => {
                        try {
                            hitAPI("DELETE", `/routines/${routine.id}`)
                            setRoutineList(routineList.filter(deleted => {
                                return routine !== deleted
                            }))
                        } catch(error) {
                            console.log(error)
                        }
                    }}>DELETE</button>
                    <button onClick={() => {
                        setEditRoutine(routine);
                    }}>EDIT</button>
                </div>
                <RoutineActivities activityList={routine.activities}
                                   />
            </div>
        })
        }
        </div>
        
        </>
}

export default MyRoutines;

