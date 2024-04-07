
const mongoose = require("mongoose")
require("dotenv").config()
const connection = mongoose.connect(process.env.MONGODB, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
})

module.exports = connection
