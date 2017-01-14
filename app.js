var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var app = express();
var db;

var mdbUrl = "mongodb://admin:password@ds163758.mlab.com:63758/coen3463-m3t5";
MongoClient.connect(mdbUrl, function(err, database){
	if (err) {
		console.log(err);
		return;
	}

	console.log("Connected to DB!");

	//set database
	db = database;

	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));

	app.use('/', index);
	app.use('/users', users);

	app.get('/collection', function(req, res, next){
		res.render('collection', { title: 'Collection' });
	});

	app.get('/collection/details', function(req, res, next){
		res.render('details', { title: 'Collection'});
	});

	app.get('/add', function(req, res, next){
		res.render('add', { title: 'Join'});
	});

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

	// error handler
	app.use(function(err, req, res, next) {
	  // set locals, only providing error in development
	  res.locals.message = err.message;
	  res.locals.error = req.app.get('env') === 'development' ? err : {};

	  // render the error page
	  res.status(err.status || 500);
	  res.render('error');
	});
});


module.exports = app;
