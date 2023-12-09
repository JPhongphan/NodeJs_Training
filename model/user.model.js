const { default: mongoose, model } = require("mongoose");

const userSchema = new mongoose.Schema({
    Username: String,
    Password: String,
    ApproveStatus: Boolean
},{
    timestamps:true
})

module.exports = mongoose.model("users", userSchema)