const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require ('body-parser')


const app = express ()
const PORT = 8000
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/elephantDB", {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
    console.log("err", err)
  })
mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
  })

app.use(express.json())
const elephantRoutes = require('./routes/elephant')
app.use('/',elephantRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`)
})