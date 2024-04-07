import React, { useEffect, useState } from 'react'



import "../App.css"
import Section from './Section'
import TaskFilter from './TaskFilter'
const ListTasks = ({ tasks, setTasks }) => {
    const [todos, setTodos] = useState([])
    const [inProgress, setInProgress] = useState([])
    const [closed, setClosed] = useState([])
    const [rework, setRework] = useState([])
    useEffect(() => {
        const fTodos = tasks.filter(task => task.status == "todo")
        const fInprogress = tasks.filter(task => task.status == "inprogress")
        const fclosed = tasks.filter(task => task.status == "done")
        const frework = tasks.filter(task => task.status == "rework")
        setClosed(fclosed)
        setInProgress(fInprogress)
        setTodos(fTodos)
        setRework(frework)
    }, [tasks])

    const statuses = ["todo", "inprogress", "done","rework"]
    return (
        <>
        <TaskFilter  tasks={tasks} setTasks={setTasks}/>
        <div className='flex gap-16'>
            
            {
                statuses.map((status, index) => {
                    return <Section key={index} status={status} tasks={tasks} setTasks={setTasks} todos={todos} inProgress={inProgress} closed={closed} rework={rework} />
                })
            }
        </div>
        </>
    )
}

export default ListTasks






