var express = require('express');
var router = express.Router();

let productSchema = require('../model/product.model');
let orderSchema = require('../model/order.model');

/* GET */
router.get('/', async (req,res) =>{
    try{
        let products = await productSchema.find();
        res.send({products});
    }
    catch(error){
        res.status(404).send("Products not found")
    }
});

/* GET 1*/
router.get('/:id', async (req,res) =>{
    try{
        let productID = req.params.id
        let product = await productSchema.findById(productID);
        res.send({product});
    }
    catch(error){
        res.status(404).send("Product not found")
    }
});

/* POST */
router.post('/', async (req,res) =>{
    try{
        let {name, price} = req.body
        const product = new productSchema({
            Name: name,
            Price: price,
        })
        await product.save()
        res.send("Successfully added the product")
    }catch(error){
        res.status(400).send("Failed to add product")
    }
});

/* PUT */
router.put('/:id', async (req,res) =>{
    try{
        let productID = req.params.id
        let {name, price, orderlimit} = req.body
        let productUpdate = await productSchema.updateOne({_id:productID},
        {$set:{
            Name: name,
            Price: price,
            Orderlimit: orderlimit
        }});
        res.send("Successfully edited the product")
    }
    catch(error){
        res.status(500).send("Failed to edit product")
    }
});

/* DELETE */
router.delete('/:id', async (req,res) =>{
    try{
        let productID = req.params.id
        let productDelete = await productSchema.deleteOne({_id:productID});
        res.send("Successfully deleted the product")
    }
    catch(error){
        res.status(500).send("Failed to delete product")
    }
});

/* GET Product Order */
router.get('/:id/orders', async(req, res) => {
    try {
        let productID = req.params.id
        let product = await productSchema.findById(productID);
        if(product.Orders == 0){
            res.send("There are no orders for this product")
        }
        res.send(product.Orders);
    } catch (error) {
        res.status(404).send("Product not found")
    }
});
/* POST Product Order */
router.post('/:id/orders', async(req, res) => {
    try {
        let productID = req.params.id
        let {ordername} = req.body
        let product = await productSchema.findById(productID);
        const order = new orderSchema({
            Ordername: ordername,
            Total: product.Price,
            Products:[{
                Product_id:productID,
                Product_name:product.Name,
                Product_price:product.Price
            }]
        })
        if(product.Orders.length >= 5){
            res.send("Order exceeds quantity(5) Unable to order");
        }
        // res.send(order);
        await order.save();
        res.send("Successfully ordered the product");
        product.Orders.push({Order_id:order.id});
        await product.save();
    } catch (error) {
        res.send("Can not order");
    }
});

module.exports = router;