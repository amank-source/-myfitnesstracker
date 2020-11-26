import React, { useState, useEffect } from 'react';
import { hitAPI } from '../api'
import { RoutineActivities } from './Routines'

const RoutineForm = ({
    handleClick
}) => {
    const [name, setName] = useState('')
    const [goal, setGoal] = useState('')
    
    return <form onSubmit={(event) => event.preventDefault()}>
                         <input
                            type="text"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value)
                            }}
                            placeholder="Message to Author"
                                                    />
                            <input
                            type="text"
                            value={goal}
                            onChange={(event) => {
                                setGoal(event.target.value)
                            }}
                            placeholder="Message to Author"
                                                    />
                          <button onClick={() => {
                              handleClick()
                              setName("");
                              setGoal("")
                            }}>Create Routine</button>
                         </form>
}

const MyRoutines = ({
    routineList,
    setRoutineList,
    isLoggedIn,
    user,
    setUser
}) => {

    useEffect(() => {
        async function fetchData() {
            const resp = await hitAPI('GET', '/users/me')
            const user = resp.username
            setUser(user);
        }
            fetchData();
            }, [isLoggedIn])

    return <><div className='myroutine-list'>
           <h1>My Routines</h1>
           {routineList.map(routine => {
            return <><div className='routine'
                        key={routine.id}>
                <h1>{routine.name} by {routine.creatorName}</h1>
                <h2>{routine.goal}</h2>
                <RoutineActivities activityList={routine.activities} />
            </div>
           </>
        })
        }
        </div>
        <RoutineForm /></>
}

export default MyRoutines;

