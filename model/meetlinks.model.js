const mongoose = require('mongoose');

const meetLinkSchema = new mongoose.Schema({
    studentid: {
        type: mongoose.Schema.ObjectId,
        ref:"User",
    },
    studentName: {
        type: String,
        required: true, 
    },
    meetlink: {
        type: String,
        required: true, 
    },
});

const MeetLink = mongoose.model('MeetLink', meetLinkSchema);

module.exports = MeetLink;