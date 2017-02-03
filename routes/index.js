var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var ObjectId = require('mongodb').ObjectId;
var db = require('../db');
var Thesis = require('../models/thesis');
var User = require('../models/user');
var Request = require('../models/request');
/* GET home page. */
router.get('/', function(req, res, next) {
	//var collection = db.get().collection('theses');
	Thesis.find()
		.sort({_id: -1})
		.limit(3).exec(function(e, entry){
		  console.log(entry);
		  res.render('index', { title: 'Home', entries: entry,
		  						user: req.user});
	});
});

router.get('/admin', function(req, res, next){
	if(req.user.type == 'admin'){
		User.find().sort({_id: -1}).exec(function(e, entry){
			res.render('admin/admin_users', {title: 'Users', entries: entry});
		});
	} else {
		res.redirect('/');
	}
});

router.get('/admin/collections', function(req, res, next){
	if(req.user.type == 'admin'){
		Thesis.find().sort({_id: -1}).exec(function(e, entry){
			res.render('admin/admin_users', {title: 'Collection', entries: entry});
		});
	} else {
		res.redirect('/');
	}
});

router.get('/admin/add', function(req, res, next){
	if(req.user.type == 'admin'){
		Request.find({type: 'add'}).sort({_id: -1}).exec(function(e, entry){
			res.render('admin/admin_users', {title: 'Add', entries: entry});
		});
	} else {
		res.redirect('/');
	}
});

router.get('/admin/edit', function(req, res, next){
	if(req.user.type == 'admin'){
		Request.find({type: 'edit'}).sort({_id: -1}).exec(function(e, entry){
			res.render('admin/admin_users', {title: 'Edit', entries: entry});
		});
	} else {
		res.redirect('/');
	}
});

router.get('/admin/delete', function(req, res, next){
	if(req.user.type == 'admin'){
		Request.find({type: 'delete'}).sort({_id: -1}).exec(function(e, entry){
			res.render('admin/admin_users', {title: 'Delete', entries: entry});
		});
	} else {
		res.redirect('/');
	}
});

router.post('/admin/add/:itemid', function(req, res, next){
	var action = req.body.btn;
	var itemid = req.params.itemid;
	if(action=="accept"){
		Request.find({'_id': itemid}, 'details', function(e, result){
			if(!result.length && !e){
				req.flash('error_msg', 'Could not find add request.');
				res.redirect('/admin/add');
			} else if(result.length && !e) {
				//var result = Request.findRequest({'_id':itemid});
				console.log(result);
				var data = new Thesis({
					_id : itemid,
					thesis : result[0].details.thesis,
					subtitle : result[0].details.subtitle,
					members : result[0].details.members,
					advisers : result[0].details.advisers,
					sentence : result[0].details.sentence,
					description : result[0].details.description,
					image : result[0].details.image,
					youtube : result[0].details.youtube,
					added : result[0].details.added,
					updated : result[0].details.updated
				});
				//console.log(data);
				console.log('Thesis entry added.');
				data.save();
				req.flash('success_msg', 'Thesis entry added successfully.');
			} else {
				req.flash('error', e);
				res.redirect('/admin/add');
			}
		});
		Request.findOneAndRemove({'_id': itemid}, function(e, entry){
			if(e){
				res.redirect('/admin/add');
			} else {
				console.log('Add request deleted');
				res.redirect('/admin/add');
			}
		});
	} else if(action=="decline"){
		Request.remove({_id: itemid}).exec(function(e, entry){
			if(e){
				req.flash('error_msg', 'Request deletion failed.');
				console.log('request not deleted')
				res.redirect('/admin/add');
			} else {
				req.flash('success_msg', 'Request deleted successfully.');
				console.log('success');
				res.redirect('/admin/add');
			}
		});
	} else {
		res.redirect('/admin/add');
	}
});

router.post('/admin/delete/:itemid', function(req, res, next){
	var action = req.body.btn;
	var itemid = req.params.itemid;
	var thesisid = req.body.thesisid;
	if(action=="accept"){
		Request.find(itemid, function(e, entry){
			if(!entry.length && !e){
				req.flash('error_msg', 'Could not find delete request.');
				res.redirect('/admin/delete');
			}  else if(entry.length && !e){
				Thesis.remove({'_id': thesisid}, function(e, result){
					if(e){
						req.flash('error_msg', 'Thesis entry delete failed.');
						res.redirect('/admin/delete');
					} else {
						
					}
				}).exec();
				Request.remove({ 'details.id' : thesisid}).exec();
				console.log('Thesis entry deleted');
				req.flash('success_msg', 'Thesis entry successfully deleted.');
				res.redirect('/admin/delete');
			} else if(e){
				req.flash('error', e);
				res.redirect('/admin/delete');
			}
		});	
	} else if(action=="decline"){
		Request.remove({'_id': itemid}).exec(function(e, entry){
			if(e){
				req.flash('error_msg', 'Request delete failed.');
				console.log('request not deleted')
				res.redirect('/admin/delete');
			} else {
				req.flash('success_msg', 'Request deleted successfully.');
				console.log('success');
				res.redirect('/admin/delete');
			}
		});
	} else {
		res.redirect('/admin/delete');
	}
});

module.exports = router;
