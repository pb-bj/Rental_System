const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname : {
         type : String,
         trim : true,
         required : true, 
    },
    email : { 
        type : String,
        unique : true,
        required : true 
    },
    password : { 
        type : String, 
        required : true 
    },
    phone : {
        type : Number,
        required : true,
        unique : true,
    },
    role : { 
        type : String, 
        required : true,
        default : "user" 
    }
}, { timestamps : true });

module.exports = mongoose.model('User', userSchema);
