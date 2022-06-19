const mongoose = require("mongoose");

var facultiesSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required: true,
      
    },
    contact:{
        type:String,
        required:true
    },
    gender:String,
    department:String,
})


module.exports= mongoose.model('Faculty',facultiesSchema);