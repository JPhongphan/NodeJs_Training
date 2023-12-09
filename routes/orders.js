var express = require('express');
var router = express.Router();

let orderSchema = require('../model/order.model');

router.get('/', async (req, res) => {
    try {
        let orders = await orderSchema.find();
        res.send({orders});
    } catch (error) {
        res.status(404).send("Orders not found")
    }
});

module.exports = router;