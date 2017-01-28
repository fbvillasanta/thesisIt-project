var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
	var collection = db.get().collection('collection');
	collection.find().sort({_id: -1}).limit(3).toArray(function(e, entry){
	  console.log(entry);
	  res.render('index', { title: 'Home', entries: entry});   
	});
});

module.exports = router;
