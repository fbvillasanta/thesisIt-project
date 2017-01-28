var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var datetime = require('node-datetime');
var dt;
var formattedDate;
var mongoose = require('mongoose');
var index = require('./routes/index');
var collection = require('./routes/collection');

//var MongoClient = require('mongodb').MongoClient;
//var ObjectId = require('mongodb').ObjectId;

var app = express();

//var mdbUrl = "mongodb://127.0.0.1:27017/thesisIt";
var mdbUrl = "mongodb://root:password@ds131119.mlab.com:31119/coen3463-m4t5";

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
