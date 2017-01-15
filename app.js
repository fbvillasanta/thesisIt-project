var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var datetime = require('node-datetime');
var dt;
var formattedDate;

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
		var collection = db.collection('collection');
		var count = collection.find().count();
		if (count == 0) {
			console.log("Collection is empty.");
		} else {
			collection.find().sort({thesis: 1}).toArray(function(err, entry){
				console.log("Thesis entries loaded.", entry);
				//res.render('collection', { entries: entry });
				res.render('collection', { title: 'Collection', entries: entry });
			});
		}
	});

	app.get('/collection/details', function(req, res, next){
		res.render('details', { title: 'Collection'});
	});

	app.get('/collection/new', function(req, res, next){
		res.render('add', { title: 'Join', success: ''});
	});

	app.post('/collection/new', function(req, res, next){
		dt = datetime.create();
		formattedDate = dt.format('m/d/Y');

		//set default image
		var imageurl = req.body.image && req.body.image.trim();
		if(imageurl == ""){
			imageurl = "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg";
		}
		
		var dataToSave = {
			thesis: 			req.body.thesis && req.body.thesis.trim(),
			subtitle: 		req.body.subtitle && req.body.subtitle.trim(),
			members: 			[	
											req.body.member1 && req.body.member1.trim(),
											req.body.member2 && req.body.member2.trim(),
											req.body.member3 && req.body.member3.trim(),
											req.body.member4 && req.body.member4.trim(),
											req.body.member5 && req.body.member5.trim()
										],
			advisers: 		[
											req.body.adviser1 && req.body.adviser1.trim(),
											req.body.adviser2 && req.body.adviser2.trim()
										],
			sentence: 		req.body.sentence && req.body.sentence.trim(),
			description: 	req.body.description && req.body.description.trim(),
			image: 				imageurl,
			youtube: 			req.body.youtube && req.body.youtube.trim(),
			added: 				formattedDate,
			updated: 			formattedDate
		};
		console.log(dataToSave);
		db.collection('collection')
			.save(dataToSave, function(err, entry){
				if(err) {
					console.log('Error adding entry!');
					return;
				}
				console.log('Entry added successfully!');
				res.render('add', {title: 'Join', success: 'yes'});
			});
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