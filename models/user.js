var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true,
		unique: [true, 'Username already in use.'],
		required: true
	},
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: [true, 'Email already in use.']
	},
	password: {
		type: String,
		required: true
	},
	type: {
		type: String,
		default: 'user'
	}
});

module.exports = mongoose.model('User', UserSchema);

module.exports.addUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(newUser.password, salt, function(err, hash){
			newUser.password = hash;
			newUser.save(callback);
		});
	});
}