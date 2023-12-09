var express = require('express');
var router = express.Router();

let userSchema = require('../model/user.model');

/* GET users listing. */
router.post('/register', async function(req, res, next) {
  let {username, password} = req.body
  const user = new userSchema({
    Username: username,
    Password: password,
    ApproveStatus: 'NOT_APPROVE'
  })
  await user.save()
  res.send("Success")
});

// router.post('/', async function(req, res){
  
// })

module.exports = router;
