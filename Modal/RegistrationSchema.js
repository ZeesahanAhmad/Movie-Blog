// imported necessary module
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// Schema for user registration
const RegisterSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }

});
// modal for user schema

module.exports=RegisterModel=mongoose.model('myRegisterSchema',RegisterSchema)

