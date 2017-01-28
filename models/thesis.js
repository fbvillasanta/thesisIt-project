var mongoose = require('mongoose');
var datetime = require('node-datetime');
var dt;
var formattedDate;

dt = datetime.create();
var formatted = dt.format('m/d/Y');

var Schema = mongoose.Schema;

var schema = Schema({
    thesis: {type: String, required: true},
    subtitle: {type: String, required: false},
    members: {type: Array, "default": []},
    advisers: {type: Array, "default": []},
    sentence: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: false},
    youtube: {type: String, required: false},
    added: {type:String, required: false, default: formatted}

});


module.exports = mongoose.model('Thesis',schema);

