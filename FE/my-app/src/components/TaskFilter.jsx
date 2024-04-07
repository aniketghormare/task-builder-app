import React, { useState } from 'react';
import axios from 'axios';

const TaskFilter = ({ setTasks }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFilter = async () => {

        try {
            const response = await axios.get(`http://localhost:5050/tasks/filter`, {
                params: {
                    startDate,
                    endDate
                }
            });

            setTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleReset = () => {
        axios.get("http://localhost:5050/tasks/get").then((res) => {

            setTasks(res.data)
            setStartDate("")
            setEndDate("")
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div>
            <label>Start Date: </label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <label className='ml-3'>End Date: </label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <button className='bg-cyan-500 rounded-md px-4 h-7 ml-3 text-white' onClick={handleFilter}>Filter</button>
            <button className='bg-cyan-500 rounded-md px-4 h-7 ml-3 text-white' onClick={handleReset}>Reset</button>
        </div>
    );
};

export default TaskFilter;
