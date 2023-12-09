var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

let userSchema = require('../model/user.model');

router.post('/', async(req, res)=>{
    try{
      let {username, password} = req.body
      let loginUser = await userSchema.findOne({Username:username})
      if(loginUser){
        const mathpass = bcrypt.compare(password, loginUser.Password);
        if(mathpass){
          /* Create Token */
          const {_id, Username, ApproveStatus} = loginUser;
          const token = jwt.sign({_id, Username, ApproveStatus}, process.env.JWT_KEY)
          console.log(process.env.JWT_KEY);
          return res.status(200).send({
            data:{_id, Username, ApproveStatus, token},
            message: "Login Success",
            success: true
          })
        }
      }
      else{
        throw new Error(1);
      }
    }
    catch(error){
      res.status(500).send("Invalid data. Please register an account");
    }
  });

module.exports = router;