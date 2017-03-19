var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

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
	},
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	facebook: {
        id        : String,
        token     : String,
        email     : String,
        name      : String
    }
});


UserSchema.pre('save', function(next) {
	var user = this;
	var SALT_FACTOR = 5;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});


//UserSchema.exports.getUserByUsername = function(username, callback){
//	var query = {username: username};
//	User.findOne(query, callback);
//};
//
//UserSchema.exports.getUserByEmail = function(email, callback){
//	var query = {email: email};
//	User.findOne(query, callback);
//};

// module.exports.getUserById = function(id, callback){
// 	User.findById(id, callback);
// }

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};
module.exports = mongoose.model('User', UserSchema);