var mongoose = require('mongoose');

var ThesisSchema = mongoose.Schema({
    department : {
        type: String,
        required: true,
        enum: ['cpe', 'ce', 'ee', 'ece', 'ie', 'me']
    },
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
    fileHandle: String,
    fileType: String,
    images: Array,
    youtube: String,
    added: Date,
    updated: Date,
    uploadedBy: String
});

var Thesis = module.exports = mongoose.model('Thesis',ThesisSchema);

