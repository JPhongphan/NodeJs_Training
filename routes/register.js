var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

let userSchema = require('../model/user.model');

router.post('/', async(req, res) => {
    try {
        let {username, password} = req.body
        let checkUsername = await userSchema.findOne({Username:username})
        const salt = await bcrypt.genSalt(10)
        const user = new userSchema({
            Username: username,
            Password: password,
            ApproveStatus: false
          });
        if(checkUsername){
            res.send("Username is already in use");
        }
        else{ 
            user.Password = await bcrypt.hash(password, salt);
            console.log(user);
            user.save()
            res.send("Registration successful. Awaiting approval");
        }
    } catch (error) {
        res.status(404).send("Page not found");
    }
  });

module.exports = router;