const express = require("express");
const router = express.Router();
const Employee = require("../models/employee")
const jwt = require ("jsonwebtoken");

router.get("", verifyToken, (req, res, next)=>{
    Employee.find().then(documents => {
        res.status(200).json({
            message: 'Successful fetch',
            data: documents

       });
   });

});


router.get("/:id", (req, res, next)=>{
  Employee.findById(req.params.id).then(document => {
    if(document){
      res.status(200).json({
        message: 'Successful fetch',
        data: document
   });
  }
  else{
    res.status(404).json({
      message: 'Not Found',
      data: null
    });
  }
 });
});

router.post("", (req, res, next)=>{
   const data = new Employee({
       fname: req.body.fname,
       lname: req.body.lname,
       dob: req.body.dob,
       address:{
           street: req.body.address.street,
           apt: req.body.address.apt,
           city: req.body.address.city,
           state: req.body.address.state,
           country: req.body.address.country
       },
       salary: req.body.salary,
       deduction: req.body.deduction,
       stax: req.body.stax
   })
   data.save().then(result=>
    {
      res.status(201).json({
        message: 'Employee added successfully',
        id: result._id
      });
    });
});

router.delete("/:id",(req, res, next)=>{
   console.log(req.params.id);
   Employee.deleteOne({_id: req.params.id}).then(result =>{
       res.status(200).json({
           message: result
       });
   });

});

router.put("/:id",(req, res, next)=>{
  const data = new Employee({
    _id: req.params.id,
    fname: req.body.fname,
    lname: req.body.lname,
    dob: req.body.dob,
    address:{
        street: req.body.address.street,
        apt: req.body.address.apt,
        city: req.body.address.city,
        state: req.body.address.state,
        country: req.body.address.country
    },
    salary: req.body.salary,
    deduction: req.body.deduction,
    stax: req.body.stax

})
   Employee.updateOne({_id: req.params.id},data).then(result =>{
    res.status(200).json({
      message: result
    });
   })
 });

function verifyToken(req, res, next){
  if(!req.headers.authorization){
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]

  if(token === null)
    return res.status(401).send('Unauthorized request')

  let payload = jwt.verify(token, process.env.JWT_KEY)

  if(!payload)
    return res.status(401).send('Unauthorized request')

  req.email = payload.subject
  next()
}


module.exports = router;
