const { default: mongoose, model } = require("mongoose");

const productSchema = new mongoose.Schema({
    Name: String,
    Price: Number,
    Orders: [{
        Order_id:{type: mongoose.Schema.Types.ObjectId, ref:'orders'},
        _id:false
    }]
},{
    timestamps:true
})

module.exports = mongoose.model("products", productSchema)