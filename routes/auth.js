var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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
			res.render('login', {title: 'Login'});
			console.log('OK');
		}
	} else if(req.body.submit == "login"){
		res.render('login', {title: 'Login'});
		console.log("Log In");
	} else {
		res.render('login', {title: 'Login'});
	}
	
});

module.exports = router;