var express = require('express');
var router = express.Router();

let userSchema = require('../model/user.model');

/* PUT users approve. */
router.put('/:id', async (req, res) => {
    try{
        let userID = req.params.id
        // if(userID.ApproveStatus != false){
        //     res.send("This account has been approved already")
        // }
        const approveUser = await userSchema.updateOne({_id:userID},
        {
            $set:{
            ApproveStatus: true
        }});
        res.send("This account has been approved")
    }
    catch(error){
        res.status(500).send("Internal Server")
    }
});

module.exports = router;