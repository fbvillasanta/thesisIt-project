var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

var Thesis = require('./models/thesis');
var User = require('./models/user');
var Request = require('./models/request');

var index = require('./routes/index');
var collection = require('./routes/admin');
var auth = require('./routes/auth');
var forgot = require('./routes/forgot');

const methodOverride = require('method-override');
const restify = require('express-restify-mongoose');
const router = express.Router();

var app = express();

var mdbUrl = "mongodb://127.0.0.1:27017/thesisIt";

var db = require('./db'); //mongoose is in db.js
db.connect(mdbUrl, function(err) {
	if (err) {
		console.log('Unable to connect to mongoose');
		process.exit(1);
	}
	else {
		console.log("Connected to DB!");

		//set database
		//db = database;
		//app.use(function(req,res,next){
		//	req.db = db;
		//	next();
		//});

		// view engine setup
		app.set('views', path.join(__dirname, 'views'));
		app.set('view engine', 'jade');

		// uncomment after placing your favicon in /public
		//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
		app.use(logger('dev'));
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended: false}));
		app.use(cookieParser());
		app.use(express.static(path.join(__dirname, 'public')));

		// Express Session
		app.use(session({
		    secret: 'secret',
		    saveUninitialized: true,
		    resave: true
		}));

		// Passport init
		app.use(passport.initialize());
		app.use(passport.session());

		// Express Restify Mongoose
		restify.serve(router, Thesis);
		restify.serve(router, User);
		restify.serve(router, Request);
		app.use(router);

		// Express Validator
		app.use(expressValidator({
		  errorFormatter: function(param, msg, value) {
		      var namespace = param.split('.')
		      , root    = namespace.shift()
		      , formParam = root;

		    while(namespace.length) {
		      formParam += '[' + namespace.shift() + ']';
		    }
		    return {
		      param : formParam,
		      msg   : msg,
		      value : value
		    };
		  }
		}));

		// Connect Flash
		app.use(flash());

		// Global Vars
		app.use(function (req, res, next) {
		  res.locals.success_msg = req.flash('success_msg');
		  res.locals.error_msg = req.flash('error_msg');
		  res.locals.error = req.flash('error');
		  res.locals.user = req.user || null;
		  next();
		});
		app.use('/forgot',forgot);
		app.use('/auth', auth);
		app.use(function(req, res, next){
			if(req.isAuthenticated()){
				next();
				return;
			}
			res.redirect('/auth/login');
		});

		app.use('/', index);
		app.use('/collection', collection);


		// catch 404 and forward to error handler
		app.use(function (req, res, next) {
			var err = new Error('Not Found');
			err.status = 404;
			next(err);
		});

		// error handler
		app.use(function (err, req, res, next) {
			// set locals, only providing error in development
			res.locals.message = err.message;
			res.locals.error = req.app.get('env') === 'development' ? err : {};

			// render the error page
			res.status(err.status || 500);
			res.render('error');
		});
	}
});


module.exports = app;
