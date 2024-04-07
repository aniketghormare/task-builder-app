// routes/pdf.js

const express = require('express');
const pdfrouter = express.Router();
const PDFDocument = require('pdfkit');

const fs = require('fs');
const TaskModel = require('../model/Task_model');

pdfrouter.get('/download', async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        
        const groupedTasks = {};
        tasks.forEach(task => {
            if (!groupedTasks[task.status]) {
                groupedTasks[task.status] = [];
            }
            groupedTasks[task.status].push(task);
        });

        const pdfDoc = new PDFDocument();
        const pdfFilePath = 'tasks_report.pdf';
        pdfDoc.pipe(fs.createWriteStream(pdfFilePath));

        Object.keys(groupedTasks).forEach(status => {
            pdfDoc.text(`Status: ${status}`);
            groupedTasks[status].forEach(task => {
                pdfDoc.text(`- ${task.name}`);
            });
            pdfDoc.moveDown();
        });

        pdfDoc.end();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=tasks_report.pdf');
        pdfDoc.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = pdfrouter;
