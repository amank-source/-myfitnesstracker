import React, { useState, useEffect } from 'react';
import { hitAPI } from '../api'
import RoutineActivities from './RoutineActvities'
import './MyRoutines.css'

const ActivityForm = (props) => {
    const {
        handleClick,
        id,
        activitiesList
    } = props;
    const [activityId, setActivityId] = useState('')
    const [count, setCount] = useState('')
    const [duration, setDuration] = useState('')
    const [act, setAct] = useState('')

    useEffect(() => {
        setActivityId(props.routineActivityId || '')
        setCount(props.count || '')
        setDuration(props.duration || '')
    }, [id])

    function clearForm() {
        setActivityId('')
        setCount('');
        setDuration('')
    }

    return <form onSubmit={(event) => event.preventDefault()}>
        <input
            type='number' 
            value={activityId}
            onChange={(event) => setActivityId(event.target.value)}
            placeholder='Id'
            />
        <input
            type='number' 
            value={count}
            onChange={(event) => setCount(event.target.value)}
            placeholder='Count'
            />
        <input
            type='number' 
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            placeholder='Duration'
            />
        <button onClick={async () => {
            handleClick(activityId, count, duration)
            clearForm();
        }}>{id ? 'Edit Activity' : 'Add Activity'}</button>
        <select className='activity-select'
                value={act}
                onChange={(event) => {
                    setAct(event.target.value)
                }}>
            {
                activitiesList.map((activity) => {
                return <option key={activity.id}>{activity.name}</option>
                })
            }
        </select>
        <button onClick={() => {
            console.log(act)
            let newAct = activitiesList.find(activity => {
                return activity.name === act
            })
            setActivityId(newAct.id)
        }}>Select Activity</button>
    </form>
}

const MyRoutines = (props) => {
    const {
        routineList,
        setRoutineList,
        setEditRoutine,
        showActivities,
        setShowActivities,
        setEditRoutineAct,
        editRoutineAct,
        user,
        activitiesList
    } = props

    return <>
        <div className='myroutine-list'>
           <h1>My Routines</h1>
           {routineList.map(routine => {
            return user === routine.creatorId ? <div className='routine'
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
                <ActivityForm routine={routine}
                              {...editRoutineAct}
                              activitiesList={activitiesList}
                              handleClick={async (activityId, count, duration) => {
                                const payload = {
                                    activityId,
                                    count,
                                    duration
                                }

                                const editpayload = {
                                    count,
                                    duration,
                                }
                                if (editRoutineAct.id) {
                                try {
                                    const editedAct = await hitAPI("PATCH", `/routine_activities/${activityId}`, editpayload)
                                    let index = routineList.findIndex((rout) => {
                                        return rout.id === routine.id
                                      })
                                      if (index > -1) {
                                        const newList = [...routineList]
                                        newList[index] = routine
                                        let actIndex = routine.activities.findIndex((activity) => {
                                            return activity.routineActivityId === editedAct.id
                                          })
                                          if (actIndex > -1) {
                                            newList[index].activities[actIndex].count = editedAct.count;
                                            newList[index].activities[actIndex].duration = editedAct.duration;
                                            setRoutineList(newList)
                                          }
                                      }
                                    setEditRoutineAct({})
                                } catch(error) {console.log(error)} 
                            } else {
                                 try {
                                    await hitAPI('POST', `/routines/${routine.id}/activities`, payload)
                                        .then((resp) => {
                                            console.log(resp)
                                            let newAct = activitiesList.find(activity => {
                                                return activity.id === resp.activityId
                                            })
                                            newAct.duration = resp.duration;
                                            newAct.count = resp.count;
                                            const newList = [...routineList];
                                            let idx = newList.indexOf(routine);
                                            newList[idx].activities.push(newAct)
                                            setRoutineList(newList);
                                            }).catch(console.error)
                                } catch(error) {console.log(error)}
                                    
                                }
                            }
                              } />
                <RoutineActivities activityList={routine.activities}
                                   showActivities={showActivities}
                                   setShowActivities={setShowActivities}
                                   myRoutines={true}
                                   setEditRoutineAct={setEditRoutineAct}
                                   handleDelete={async (activity) => {
                                    try {
                                        await hitAPI("DELETE", `/routine_activities/${activity.routineActivityId}`)
                                            .then((resp) => {
                                                const newList = [...routineList];
                                                let idx = newList.indexOf(routine);
                                                let activityIdx = newList[idx].activities.indexOf(activity)
                                                newList[idx].activities.splice(activityIdx, 1);
                                                setRoutineList(newList);
                                            }).catch(console.error)
                                        
                                    } catch(error) {
                                        console.log(error)
                                    }
                                   }}
                                   />
            </div> : null
        })
        }
        </div>
        </>
}

export default MyRoutines;
