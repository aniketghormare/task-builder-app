

const express = require('express');
const TaskModel = require('../model/Task_model');
const Taskrouter = express.Router();



Taskrouter.get('/get', async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

Taskrouter.post('/add', async (req, res) => {
    const { name, status } = req.body;

    try {
        const newTask = new TaskModel({ name, status });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});



Taskrouter.patch('/update/:id', async (req, res) => {
    const { status } = req.body;

    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(updatedTask);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


Taskrouter.delete('/delete/:id', async (req, res) => {
    try {
        const task = await TaskModel.findByIdAndDelete({ _id: req.params.id });
        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

Taskrouter.get('/filter', async (req, res) => {
    

    try {
      
       let query={}

       if(req.query.startDate && req.query.endDate){
        query.date={
            $gte:new Date(req.query.startDate),
            $lte:new Date(req.query.endDate),
        }
       }
       const data=await TaskModel.find(query)
       
       res.status(200).send(data)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = Taskrouter;
