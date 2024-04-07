import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import axios from "axios"

import CreateTask from "../components/CreateTask";
import ListTasks from "../components/ListTasks";
function TaskMain() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5050/tasks/get").then((res) => {

      setTasks(res.data)
    }).catch((err) => {
      console.log(err)
    })

  }, [])

  const handlenav = () => {
    navigate("/")
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className="bg-slate-200 flex justify-end items-center pt-2 pr-1">
        <button onClick={handlenav} className='bg-teal-500 rounded-md px-4 h-8 text-white  '>Home/Login</button>
      </div>

      <div className="bg-slate-200 w-screen h-auto flex flex-col items-center p-3 gap-16 ">

        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
        <br /><br />
      </div>
    </DndProvider>




  );
}

export default TaskMain;
