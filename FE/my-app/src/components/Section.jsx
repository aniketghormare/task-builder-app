
import react from "react"

import axios from "axios"

import { useDrop } from "react-dnd"
import Task from "./Task"
import Header from "./Header"

const Section = ({ status, tasks, setTasks, todos, inProgress, closed, rework }) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => {
            console.log(item.id)
            addItemToSection(item.id)
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    let text = "Todo"
    let bg = "bg-slate-500"
    let tasksToMap = todos

    if (status == "inprogress") {
        text = "In Progress"
        bg = "bg-purple-500"
        tasksToMap = inProgress
    }

    if (status == "done") {
        text = "Done"
        bg = "bg-green-500"
        tasksToMap = closed
    }

    if (status == "rework") {
        text = "Rework"
        bg = "bg-red-500"
        tasksToMap = rework
    }
    function addItemToSection(id) {
        
        setTasks((prev) => {
            const mTasks = prev.map((el) => {
                if (el._id == id) {
                    return { ...el, status: status }
                }
                return el
            })
           
            let obj = {
                status
            }
            axios.patch(`http://localhost:5050/tasks/update/${id}`, obj).then((res) => {
                
                console.log(res)
            }).catch((err) => {
                console.log("err", err)
            })
            
            return mTasks
        })
    }
    return <div ref={drop} className={`w-64 p-2 rounded-md ${isOver ? "bg-slate-200" : ""} h-96 overflow-y-auto scrollbar`}><Header text={text} bg={bg} count={tasksToMap.length} />
        {
            tasksToMap.length > 0 && tasksToMap.map((el, index) => {
                return (
                    <Task key={el._id} tasks={tasks} setTasks={setTasks} task={el} />
                )
            })
        }
    </div>
}

export default Section;
