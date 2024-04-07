const express = require("express")
const connection = require("./db");
const Taskrouter = require("./Routes/Task_route");
const cors = require("cors");
const Authrouter = require("./Routes/Auth_route");
const pdfrouter = require("./Routes/pdf");

require("dotenv").config()
const app = express()
app.use(cors())
app.use(express.json());
app.use('/auth', Authrouter);
app.use('/tasks', Taskrouter);
app.use('/pdf', pdfrouter); 
app.get("/", (req, res) => {
    res.send("Home")
})



let PORT = process.env.PORT || 5050
app.listen(PORT, () => {
    connection
    console.log("connected")
})