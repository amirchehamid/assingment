const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    matric: String,
    time: String
})

const UserModel = mongoose.model("Attendance", userSchema)

module.exports = UserModel