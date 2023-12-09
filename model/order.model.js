const { default: mongoose, model } = require("mongoose");

const orderSchema = new mongoose.Schema({
    Ordername: String,
    Total: Number,
    Products:[{
        Product_id:{type: mongoose.Schema.Types.ObjectId, ref:'products'},
        Product_name:{type: String},
        Product_price:{type: Number},
        _id:false
    }]
},{
    timestamps:true
})

module.exports = mongoose.model("orders", orderSchema)