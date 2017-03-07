var mongoose = require('mongoose');

var ThesisSchema = mongoose.Schema({
    thesis: {
        type: String,
        index: true
    },
    subtitle: String,
    description: String,
    year : Number,
    tags: {
        type: Array,
        index: true
    },
    members: Array,
    advisers: Array,
    fileURL: String,
    images: Array,
    youtube: String,
    added: Date,
    updated: Date,
    uploadedBy: String
});

var Thesis = module.exports = mongoose.model('Thesis',ThesisSchema);

