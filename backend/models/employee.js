const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    dob: {type: Date},
    address:{
        street: String,
        apt: String,
        city: String,
        state: String,
        country: String
    },
    updated_time: {type: Date, default: Date.now},
    email: String,
    password: String,
    salary: Number,
    deduction: Number,
    stax: String
});

module.exports = mongoose.model('Employee', employeeSchema);
