const User = require("../models/employee")
const bcrypt = require("bcryptjs");
const jswt = require ("jsonwebtoken");

exports.userLogin =(req,res,next)=>{
  let fetechedUser;
  User.findOne({email: req.body.email}).then(user =>{
  if(!user){
    return res.status(401).json({
      message:'Email and/or Password do not match'
    });
  }
    fetechedUser = user;
    return bcrypt.compare(req.body.password, fetechedUser.password);
  }).then(result =>{
  if(!result){
    return res.status(401).json({
      message:"Email and/or Password do not match"
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
      message: "Email and/or Password do not match"
    });
  });
}
