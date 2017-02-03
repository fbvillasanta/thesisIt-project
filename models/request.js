var mongoose = require('mongoose');

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
		sentence: String,
		description: String,
		image: String,
		youtube: String,
		added: String,
		updated: String
	},
	type: {
		type: String,
		required: true,
		enum: ['add', 'edit', 'delete']
	}
});

RequestSchema.methods.findRequest = function(id){
	var query = {_id: id};
	return this.model('Request').findOne(query);
}

var Request = module.exports = mongoose.model('Request', RequestSchema);

