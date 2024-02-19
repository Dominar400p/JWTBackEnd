let express = require('express')
let app = express();
let mongoose = require('mongoose')
let crudRoute = require('./routes/crud')
let cors = require('cors')
app.use(cors())

//Connecting To DataBase
mongoose.connect("mongodb+srv://levakupradeepkumar:January25@cluster0.oa6xmtw.mongodb.net/jwt").then(() => {
    console.log('DB Connected')
})

//Testing Purpose
app.get('/', (req, res) => {
    res.send("Hello")
})

//MiddleWare
app.use(express.json())
app.use('/crud', crudRoute)


//For Server Running
app.listen(8080, () => {
    console.log("Server Is Running")
})