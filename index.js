const app = require("express")()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const UserModel = require("./student/UserModels.js")
const UserList = require("./lecturer/UserLists.js")
require('dotenv').config();

//connect mongodb
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () =>{
    console.log("connect to mongodb")
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

//POST for student to key in attendance
app.post("/student", async (req, res, next) => {
    try{
        const user = await UserModel.create({
            name: req.body.name,
            matric: req.body.matric,
            time: req.body.time
        })
        res.json(user)
    } catch(e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

//POST for lecturer to key in list name student
app.post("/lecturer", async (req, res, next) => {
    try{
        const user = await UserList.create({
            name: req.body.name,
            matric: req.body.matric
        })
        res.json(user)
    } catch(e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

//GET for lecturer to find student who absent or attend class
app.get("/lecturer/:id", async (req, res, next) => {
    try{
       const result = await UserList.findById(req.params.id)
       res.json(result)
    } catch(e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

//PUT for lecturer to change the student detail in list
app.put("/lecturer/:id", async (req, res, next) => {
    try{
        const user = await UserList.findOneAndUpdate({_id: req.params.id}, {
            name: req.body.name,
            matric: req.body.matric,
            time: req.body.time
        },{
            new: true,
            useFindAndModify: false
        })
        res.json(user)
    } catch(e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

//DELETE for lecturer to delete student name who not take this course
app.delete("/lecturer/:id", async (req, res, next) => {
    try{
        const result = await UserList.deleteOne({_id: req.params.id})
        res.json(result)
    } catch(e){
        next(e)
    }
})

//localhost:5000
app.listen(5000, () => {
    console.log("Started listening on port 5000")
})