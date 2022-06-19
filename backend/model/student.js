const mongoose = require("mongoose");

var studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    fname:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required: true,
       
    },
    contact:{
        type:String,
        required: true,
       
    },
    dob:{
        type:String,
        required: true
    },

    gender:String,
    department:String,

    address:{
        type:String,
        required: true
    },
    e_qualification:{
        type:String,
        required: true
    },
    job:{
        type:String,
        required: true
    },
    c_job:{
        type:String,
        require:true
    },
    freshers:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    }

})


module.exports= mongoose.model('Student',studentSchema);

// const Studentdb = mongoose.model('studentdb',schema);

// module.exports = Studentdb; 