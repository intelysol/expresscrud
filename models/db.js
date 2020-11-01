const mongoose=require('mongoose');
require('./employee.model');

mongoose.connect("mongodb://localhost:27017/employeeDB",{useNewUrlParser:true},(err)=>{
    if(!err){
        console.log('MongoDB Connection Succeeded.')
    }else{
        console.log("Error Connecting mongodb")
    }
});
