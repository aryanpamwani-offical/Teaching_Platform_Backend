const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({

    title: {
         type: String,
         required: true
         },
    slug: {
        type: String,
         required: true
         },
    description_for_seo: { 
        type: String,
         required: true 
        },
    keywords_for_seo: { 
        type: String,
         required: true
         },
    image_url: { 
        type: String,
         required: true
         },
    content: { 
        type: String,
         required: true
         },

}, { timestamps: true });

const Notes = mongoose.model('Note', notesSchema);

module.exports = Notes;