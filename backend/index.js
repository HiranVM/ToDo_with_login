const express = require('express')
const mongoose = require("mongoose")
const dotenv = require('dotenv').config()
const cors = require('cors')
const authController = require('./controllers/authController')
const toDoController = require('./controllers/toDoController')
const app = express()

// connect db
mongoose.set('strictQuery', false);
// mongoose.connect(process.env.MONGO_URL, () => console.log('MongoDB has been started successfully'))
mongoose.connect('mongodb://0.0.0.0:27017/todo');

// routes


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/auth', authController)
app.use('/todo', toDoController)




// connect server
app.listen(process.env.PORT, () => console.log('Server has been started successfully'))