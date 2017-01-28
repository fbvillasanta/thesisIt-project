var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

router.get('/', function(req, res, next){
	res.render('login', {title: 'Login'})
});

router.post('/', function(req, res, next){
	if(req.body.submit == "signup"){
		var username = req.body.username && req.body.username.trim();
		var fname = req.body.fname && req.body.fname.trim();
		var lname = req.body.lname && req.body.lname.trim();
		var email = req.body.email && req.body.email.trim();
		var password1 = req.body.password1;
		var password2 = req.body.password2;

		// Sanitize
		req.sanitize('username').trim();
		req.sanitize('fname').trim();
		req.sanitize('lname').trim();
		req.sanitize('email').trim();

		// Validation
		req.checkBody('username', 'Username is required').notEmpty();
		req.checkBody('username', 'Username cannot contain numbers or special characters').isAlpha();
		req.checkBody('username', 'Username is short').len(8,20);
		req.checkBody('fname', 'First name is required').notEmpty();
		req.checkBody('lname', 'Last name is required').notEmpty();
		req.checkBody('email', 'Email is required').notEmpty();
		req.checkBody('email', 'Email is not valid').isEmail();
		req.checkBody('password1', 'Username is required').notEmpty();
		req.checkBody('password2', 'Passwords do not match').equals(password1);

		var errors = req.validationErrors();

		if(errors){
			res.render('login',{
				title: 'Login',
				errors: errors,
				data: {
					username : username,
					fname : fname,
					lname : lname,
					email : email
				}
			});
			console.log(errors);
		} else {
			var newUser = new User({
				username: username,
				firstname: fname,
				lastname: lname,
				email: email,
				password: password1
			});

			User.addUser(newUser, function(err, user){
				if (err) {
					res.render('login', {
						title: 'Login',
						errors: err,
						data: {
							username: username,
							fname: fname,
							lname: lname,
							email: email
						}
					});
					console.log(err);
					console.log(user);
				} else {
					req.flash('success_msg', 'You are now registered. Log-in to continue.');

					res.redirect('/auth');
					console.log('OK');
				}
				
			});

		}
	} else {
		res.redirect('/auth');
	}
	
});

passport.use(new LocalStrategy(
	function(username, password, done){
		User.findOne({username:username}, function(err, user){
			if (err) { return done(err) }
			if (!user) {
				return done(null, false, { messsage : 'Unknown username.'});
			}
			User.comparePassword(password, user.password, function(err, isMatch){
				if(err) { return done(err) }
				if(isMatch){
					return done(null, user);
				} else {
					return done(null, false, { message: 'Incorrect password.'});
				}
			});
		});
	}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login', passport.authenticate('local', {successRedirect:'/', failureRedirect:'/auth', failureFlash:true}),
	function(req, res){
	res.redirect('/');
});

module.exports = router;