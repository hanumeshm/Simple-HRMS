const express = require("express");
const router = express.Router();
const User = require("../models/employee")
const bcrypt = require("bcryptjs");
const jswt = require ("jsonwebtoken");

router.post("/login",(req,res,next)=>{
  let fetechedUser;
User.findOne({email: req.body.email}).then(user =>{
  if(!user){
  return res.status(401).json({
    message:'Unable to find the user email'
  });
  }
  fetechedUser = user;
  return bcrypt.compare(req.body.password, user.password);
}).then(result =>{
  if(!result){
    return res.status(401).json({
      message:"Auth failed"
    })
  }
const token = jswt.sign(
  {email: fetechedUser.email},
  process.env.JWT_KEY,
  {expiresIn: "1h"}
  );
  return res.status(200).json({
        message:"Auth Success",
        token: token
  });
}).catch(err =>{
  return res.status(401).json({
    message: err
});
});
});

module.exports = router;
