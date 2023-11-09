const mongoose = require("mongoose");

const employeeschema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        // unique:true
    },
    password:{
        type:String,
        required:true
    },
    Mobile_Number:{
        type:String,
        required:true
        // unique:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    pin:{
        type:String,
        required:true
    },
})


// create collection

const Register = new mongoose.model("Register",employeeschema);

module.exports=Register;

