var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var async = require('async');

var configAuth = require('../config/passport');
var User = require('../models/user');

passport.use('local', new LocalStrategy({passReqToCallback:true},function(req, username, password, done) {
	var username = username.toLowerCase();
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

var fbStrategy = configAuth.facebookAuth;
fbStrategy.passReqToCallback = true;
passport.use(new FacebookStrategy(fbStrategy, function(req, token, refreshToken, profile, done) {

  // check if the user is already logged in
  if (!req.user) {
    User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
      if (err)
        return done(err);

      if (user) {

        // if there is a user id already but no token (user was linked at one point and then removed)
        if (!user.facebook.token) {
          user.facebook.token = token;
          user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
          user.facebook.email = (profile.emails[0].value || '').toLowerCase();

          user.save(function(err) {
            if (err)
              return done(err);
              
            return done(null, user);
          });
        }

        return done(null, user); // user found, return that user
      } else {
        // // if there is no user, create them
        // var newUser            = new User();

        // newUser.facebook.id    = profile.id;
        // newUser.facebook.token = token;
        // newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
        // newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

        // newUser.save(function(err) {
        //   if (err)
        //     return done(err);
            
        //   return done(null, newUser);
        // });
      }
    });

  } else {
      // user already exists and is logged in, we have to link accounts
      var user            = req.user; // pull the user out of the session

      user.facebook.id    = profile.id;
      user.facebook.token = token;
      user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
      user.facebook.email = (profile.emails[0].value || '').toLowerCase();

      user.save(function(err) {
          if (err)
              return done(err);
              
          return done(null, user);
      });

  }

}));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

router.get('/login', function(req, res, next){
	if(req.isAuthenticated()){
		res.redirect('/')
	}
	res.render('login',{title: 'Login'});
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


router.get('/register', function(req,res,next){
	if(req.isAuthenticated()){
		res.redirect('/')
	}
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
				username: username,
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

router.get('/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/',
        failureRedirect : '/'
    }));

router.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

// handle the callback after facebook has authorized the user
router.get('/connect/facebook/callback',
  passport.authorize('facebook', {
      successRedirect : '/',
      failureRedirect : '/'
  }));

router.get('/unlink/facebook', isLoggedIn, function(req, res) {
  var user            = req.user;
  user.facebook.token = undefined;
  user.save(function(err) {
      res.redirect('/');
  });
});

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'You are logged out!');
	res.redirect('/auth/login');
});

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

module.exports = router;