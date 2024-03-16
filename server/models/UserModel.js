const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
         type : String,
         trim : true,
         required : true, 
         unique : true 
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
    role : { 
        type : String, 
        required : true,
        default : "user" 
    }
}, { timestamps : true });

module.exports = mongoose.model('User', userSchema);
