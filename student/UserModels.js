const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    matric: String,
    time: String
})

const UserModel = mongoose.model("benrs", userSchema)

module.exports = UserModel