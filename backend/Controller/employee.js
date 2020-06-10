const Employee = require("../models/employee");


exports.createEmployee = (req, res, next)=>{
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
}

exports.deleteEmployee =(req, res, next)=>{
  Employee.deleteOne({_id: req.params.id}).then(result =>{
      res.status(200).json({
          message: result
      });
  });
}

exports.updateEmployee = (req, res, next)=>{
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
 }

 exports.getEmployee =(req, res, next)=>{
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
}

exports.getEmployees = (req, res, next)=>{
  Employee.find().then(documents => {
      res.status(200).json({
          message: 'Successful fetch',
          data: documents

     });
 });

}
