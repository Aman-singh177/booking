const mongoose = require('mongoose')

// define the schema which our table have 
const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Ensures the field is required
    },
    email: {
        type: String,
        required: true, // Ensures the field is required
        unique: true,   // Ensures unique email addresses
    },
    password: {
        type: String,
        required: true, // Ensures the field is required
    },
    isAdmin:{
        type : Boolean, default:false
    }
});


// we will assign name which we like to have in the database
const EmployeeModel = mongoose.model("employees",EmployeeSchema)
module.exports = EmployeeModel

