import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from "uuid"
import axios from "axios"
const CreateTask = ({ tasks, setTasks }) => {
    const [task, setTask] = useState({
        id: "",
        name: "",
        status: "todo"

    })
    const handlesubmit = (e) => {
        e.preventDefault();
        if (task.name.length < 3) {
            return toast.error("Input Fileld is Empty or lest then 3 characters!!😌")
        }
        setTasks((pre) => {
            const list = [...pre, task]
            localStorage.setItem("tasks", JSON.stringify(list))
            return list
        })
        axios.post("https://task-builder-app.onrender.com/tasks/add", task).then((res) => {
            toast.success("Task Created!!😀")
            setTask({
                id: "",
                name: "",
                status: "todo",

            })
        }).catch((err) => {
            console.log(err)
        })

    }
    const handleDownloadPdf = async () => {
        try {
            const response = await axios.get("https://task-builder-app.onrender.com/pdf/download", {
                responseType: 'blob'
            });


            const blob = new Blob([response.data], { type: 'application/pdf' });


            const url = window.URL.createObjectURL(blob);


            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'tasks_report.pdf');
            document.body.appendChild(link);


            link.click();


            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error(error);
        }
    }
   
    return (
        <>
            <form onSubmit={handlesubmit} className='mt-10'>
                <input placeholder='Create Tasks' type="text" value={task.name} onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })} className='border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1' />
                <button className='bg-cyan-500 rounded-md px-4 h-12 text-white'>Create</button>
            </form>
            <button className='bg-cyan-500 rounded-md px-4 h-12 text-white' onClick={handleDownloadPdf}>Download Pdf</button>
        </>
    )
}

export default CreateTask
