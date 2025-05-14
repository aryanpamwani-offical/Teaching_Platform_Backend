const mongoose = require('mongoose');

const classesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    dayofWeek:{
        type:String,
        required:true,
    },
    meetid: {
        type: mongoose.Schema.ObjectId,
        ref: "MeetLink",
    },
    meetlink:{
        type:String,
    },
    notesid: {
        type: mongoose.Schema.ObjectId,
        ref: "Notes",
    },
    notesName:{
        type:String,
    },
    noteslink:{
        type:String,
    },
},{
    timestamps:true,
});

const Classes = mongoose.model('Classes', classesSchema);

module.exports = Classes;