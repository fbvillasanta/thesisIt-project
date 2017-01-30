var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var async = require('async');
var User = require('../models/user');

router.get('/login', function(req, res, next){
	res.render('login',{title: 'Login'});
});
router.get('/register', function(req,res,next){
	res.render('login',{title: 'Register'});
});


router.post('/register', function(req, res, next){
	if(req.body.submit == "signup"){
		var username = req.body.username && req.body.username.trim();
		var fname = req.body.fname && req.body.fname.trim();
		var lname = req.body.lname && req.body.lname.trim();
		var email = req.body.email && req.body.email.trim();
		var password = req.body.password;
		var confirm = req.body.confirm;

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
		req.checkBody('password', 'Username is required').notEmpty();
		req.checkBody('confirm', 'Passwords do not match').equals(password);

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
			var user = new User({
				username: username.toLowerCase(),
				firstname: fname,
				lastname: lname,
				email: email.toLowerCase(),
				password: password
			});

			user.save(function(err){
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
					res.redirect('/auth/login');
					console.log(user);
				}
			});

		}
	} else {
		res.redirect('/auth/register');
	}
});

// passport.use('local-signup', new LocalStrategy({passwordField:'email', passReqToCallback:true},
// 	function(req, username, email, done){
// 		var message = '';
// 		User.findOne({'username':username}, function(err, user){
// 			if (err) { return done(err); }
// 			if (user) {
// 				message += 'Username is already taken.';
// 			}
// 		});
// 		User.findOne({'email': email}, function(err, user){
// 			if (err) {return done(err);}
// 			if (user) {
// 				message += 'Email is already registered.';
// 			}
// 		});

// 		if (message === ''){
// 			return done(null, user);
// 		} else {
// 			return done(null, false, req.flash('error_msg', message));
// 		}
// 	}));

//passport.use('local-login', new LocalStrategy({passReqToCallback:true},
//	function(req, username, password, done){
//		username = username.toLowerCase();
//		User.findOne({username:username}, function(err, user){
//			if (err) { return done(err); }
//			if (!user) {
//				return done(null, false, req.flash('error_msg', 'Unknown username.'));
//			}
//			user.comparePassword(password, function(err, isMatch){
//				if(err) { return done(err) }
//				if(isMatch){
//					return done(null, user);
//				} else {
//					return done(null, false, req.flash('error_msg', 'Incorrect password.'));
//				}
//			});
//		});
//	}));

passport.use(new LocalStrategy({passReqToCallback:true},function(req, username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, req.flash('error_msg', 'Unknown username.'));
    user.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, req.flash('error_msg', 'Incorrect password.'));
      }
    });
  });
}));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login', function(req, res, next) {
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/auth/login',
		failureFlash: true
	}, function (err, user, info) {
			if (err) return next(err);
			if (!user) {
				return res.redirect('/auth/login')
			}
			req.logIn(user, function (err) {
				if (err) return next(err);
				console.log(user);
				return res.redirect('/');
			});
		})(req, res, next);
});


router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'You are logged out!');
	res.redirect('/auth/login');
});

module.exports = router;