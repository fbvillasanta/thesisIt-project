var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var db = require('../db');
var Thesis = require('../models/thesis');
/* GET home page. */
router.get('/', function(req, res, next) {
	//var collection = db.get().collection('theses');
	Thesis.find()
		.sort({_id: -1})
		.limit(3).exec(function(e, entry){
		  console.log(entry);
		  res.render('index', { title: 'Home', entries: entry});
	});
});



module.exports = router;
