const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
      
    },
    phone_number: {
        type: String,
        required: true, // Mandatory field
    },
    password: {
        type: String,
        required: true, // Mandatory field
    },
    userType:{
        type:String,
        enum:["Student","Admin"],
        default:"Student",
    },
    classId:[{
        type:mongoose.Schema.ObjectId,
        ref:"Classes"
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;