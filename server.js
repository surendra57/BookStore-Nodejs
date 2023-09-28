const express = require('express')
const dotenv = require('dotenv')
const ConnectDB = require('./config/db')
const cookieParser = require("cookie-parser");


const app = express()
dotenv.config()
const PORT = process.env.PORT

//middleware
app.use(express.json())
app.use(cookieParser())

// DB Connection
ConnectDB()

// Routes imports
const authUser = require('./routes/authRoutes')
const BookRoute = require ("./routes/bookRoutes")

app.use('/api/v1',authUser)
app.use('/api/v1',BookRoute)

app.get('/',(req,res)=>{
    res.send("hello")
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})