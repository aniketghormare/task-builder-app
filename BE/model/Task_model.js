

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'done', 'rework'],
        default: 'todo'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;
