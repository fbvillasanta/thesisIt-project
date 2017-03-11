var express = require('express');
var router = express.Router();
var moment = require('moment');
var ObjectId = require('mongodb').ObjectId;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var db = require('../db');
var Thesis = require('../models/thesis');
var User = require('../models/user');
var Request = require('../models/request');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method
    }
}));

/* GET home page. */
router.get('/', function(req, res, next) {
	//var collection = db.get().collection('theses');
	Thesis.find()
		.sort({added: -1})
		.limit(3).exec(function(e, entry){
		  console.log(entry);
		  res.render('index', { title: 'Home', entries: entry,
		  						user: req.user, moment: moment});
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
		Request.find({'_id': itemid}, 'details createdAt username', function(e, result){
			if(!result.length && !e){
				req.flash('error_msg', 'Could not find add request.');
				return res.redirect('/admin/add');
			} else if(result.length && !e) {
				//var result = Request.findRequest({'_id':itemid});
				console.log(result);
				var data = new Thesis({
					_id : ObjectId(itemid),
					thesis : result[0].details.thesis,
					subtitle : result[0].details.subtitle,
					description : result[0].details.description,
					year : result[0].details.year,
					tags : result[0].details.tags,
					members : result[0].details.members,
					advisers : result[0].details.advisers,
					fileURL : result[0].details.fileURL,
					images : result[0].details.images,
					youtube : result[0].details.youtube,
					added : result[0].createdAt,
					updated : result[0].createdAt,
					uploadedBy: result[0].username
				});
				//console.log(data);
				console.log('Thesis entry added.');
				data.save();
				req.flash('success_msg', 'Thesis entry added successfully.');
			} else {
				req.flash('error', e);
				return res.redirect('/admin/add');
			}
		});
		Request.findOneAndRemove({'_id': itemid}, function(e, entry){
			if(e){
				return res.redirect('/admin/add');
			} else {
				console.log('Add request deleted');
				return res.redirect('/admin/add');
			}
		});
	} else {
		res.redirect('/admin/add');
	}
});

router.delete('/admin/add/:itemid', function(req, res, next){
	var itemid = req.params.itemid;
	Request.remove({_id: itemid}).exec(function(e, entry){
		if(e){
			req.flash('error_msg', e);
			console.log('request not deleted')
			res.redirect('/admin/add');
		} else {
			req.flash('success_msg', 'Request deleted successfully.');
			console.log('success');
			res.redirect('/admin/add');
		}
	});
});

router.put('/admin/edit/:itemid', function(req, res, next){
	var requestId = req.params.itemid;
	Request.findOne({'_id':ObjectId(requestId)}, 'details', function(err, entry){
		if (err) {
			res.send("There was a problem in finding that particular request: " + err);
		} else {
			var dataToSave = {
				thesis : entry.details.thesis,
				subtitle : entry.details.subtitle,
				members : entry.details.members,
				advisers : entry.details.advisers,
				sentence : entry.details.sentence,
				description : entry.details.description,
				image : entry.details.image,
				youtube : entry.details.youtube,
				updated : entry.details.updated
			};
			Thesis.findByIdAndUpdate(ObjectId(entry.details.id), dataToSave, function (err, result) {
				if(err) {
					res.send('There was a problem in updating that thesis entry: ' + err);
				} else {
					Request.findOneAndRemove({'_id': ObjectId(requestId)}).exec();
					req.flash('success_msg', 'Thesis entry was successfully updated.');
					res.redirect('/admin/edit');
				}
            });
		}
	})
});

router.delete('/admin/edit/:itemid', function(req, res, next){
	var requestId = req.params.itemid;
	Request.findOneAndRemove({ '_id': ObjectId(requestId) },  function(err, entry) {
        if (err) {
            res.send("There was a problem deleting an entry to the database: " + err);
        } else {
        	req.flash('success_msg', 'Request was successfully deleted.')
            console.log('Item deleted');
            res.redirect('/admin/edit') ;
        }

    });
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
	} else {
		res.redirect('/admin/delete');
	}
});

router.delete('/admin/delete/:itemid', function(req, res, next){
	var itemid = req.params.itemid;
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
});

module.exports = router;
