const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const employeeRoute = require("./routes/employee")
const userRoute = require("./routes/user")

const app = express();

app.use((req, res, next) =>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
});

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://dev:"+ process.env.MONGO_ATLAS_PWD +"@cluster0-jbpd5.mongodb.net/test")
.then(()=>{
  console.log('Connected to DB');
})
.catch((error)=>{
  console.log(error);
});

app.use("/api/employees",employeeRoute)
app.use("/api/user",userRoute)

module.exports = app;

