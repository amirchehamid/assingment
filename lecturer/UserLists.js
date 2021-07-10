const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    matric: String,
    email: String,
    phone: String
})

const UserModel = mongoose.model("list_name", userSchema)

module.exports = UserModel