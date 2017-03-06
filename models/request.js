var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var RequestSchema = mongoose.Schema({
	username: {
		type: String,
		index: true,
		required: true
	},
	details: {
		id: String,
		thesis: String,
		subtitle: String,
		members: Array,
		advisers: Array,
		description: String,
		tags: {
			type: String,
			index: true
		},
		image: Array,
		youtube: String,
		file: String
	},
	type: {
		type: String,
		required: true,
		enum: ['add', 'edit', 'delete']
	}
});

RequestSchema.plugin(timestamps);

RequestSchema.methods.findRequest = function(id){
	var query = {_id: id};
	return this.model('Request').findOne(query);
}

var Request = module.exports = mongoose.model('Request', RequestSchema);

