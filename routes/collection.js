var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var assert = require('assert');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = require('../db');

var datetime = require('node-datetime');
var dt;
var formattedDate;
router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method
    }
}));
router.get('/', function(req, res, next){
    var collection = db.get().collection('collection');
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

router.get('/new', function(req, res, next){
    res.render('add', { title: 'Join', success: ""});
});

router.post('/new', function(req, res, next){
    var collection = db.get().collection('collection');
    dt = datetime.create();
    var formatted = dt.format('m/d/Y');

    //set default image
    var imageurl = req.body.image && req.body.image.trim();
    if(imageurl == ""){
        imageurl = "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg";
    }

    var sentence = req.body.sentence && req.body.sentence.trim();
    if(sentence == ""){
        sentence = "No description added.";
    }

    var description = req.body.description && req.body.description.trim();
    if(description == ""){
        description = "No description added.";
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
        sentence: 		sentence,
        description: 	description,
        image: 				imageurl,
        youtube: 			req.body.youtube && req.body.youtube.trim(),
        added: 				formatted,
        updated: 			formatted
    };
    console.log(dataToSave);
    collection.save(dataToSave, function(err, entry){
        if(err) {
            console.log('Error adding entry!');
            return;
        }
        console.log('Entry added successfully!');
        res.render('add', {title: 'Join', sent: 'yes'});

    });
});

router.get('/:thesisId', function(req, res, next){
    var thesisId = req.params.thesisId;
    var collection = db.get().collection('collection');
    collection.findOne({ _id:ObjectId(thesisId) }, function(err, entry) {
        res.render('details', {
            title: 'Collection',
            entry: entry
        });
    });
});

router.get('/:thesisId/edit', function(req, res, next){
    var thesisId = req.params.thesisId;
    var collection = db.get().collection('collection');
    collection.findOne({ _id: new ObjectId(thesisId)}, function(err, entry){
        res.render('edit', {title: 'Collection', entry: entry});
    });
});

router.put('/:thesisId', function(req,res, next) {
    var collection = db.get().collection('collection');
    dt = datetime.create();
    formattedDate = dt.format('m/d/Y');

    //set default image
    var imageurl = req.body.image && req.body.image.trim();
    if(imageurl == ""){
        imageurl = "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg";
    }

    var sentence = req.body.sentence && req.body.sentence.trim();
    if(sentence == ""){
        sentence = "No description added.";
    }

    var description = req.body.description && req.body.description.trim();
    if(description == ""){
        description = "No description added.";
    }

    var dataToSave = {
        thesis:             req.body.thesis && req.body.thesis.trim(),
        subtitle:       req.body.subtitle && req.body.subtitle.trim(),
        members:            [
            req.body.member1 && req.body.member1.trim(),
            req.body.member2 && req.body.member2.trim(),
            req.body.member3 && req.body.member3.trim(),
            req.body.member4 && req.body.member4.trim(),
            req.body.member5 && req.body.member5.trim()
        ],
        advisers:       [
            req.body.adviser1 && req.body.adviser1.trim(),
            req.body.adviser2 && req.body.adviser2.trim()
        ],
        sentence:       sentence,
        description:    description,
        image:              imageurl,
        youtube:            req.body.youtube && req.body.youtube.trim(),
        updated:            formattedDate
    };
    var collection = db.get().collection('collection');
    var thesisId = req.params.thesisId;
    collection.update({ '_id': ObjectId(thesisId) }, {$set: dataToSave }, function(err, entry) {

        if (err) {
            res.send("There was a problem updating the information to the database: " + err);
        }
        else {
            res.format({
                html: function () {

                    res.redirect("/collection/" + thesisId);
                },
                //JSON responds showing the updated values
                json: function () {
                    res.json(entry);
                }
            });

        }
    });

});
router.delete('/:thesisId',function(req,res,next) {
    var collection = db.get().collection('collection');
    var thesisId = req.params.thesisId;
    collection.deleteOne({ '_id': ObjectId(thesisId) },  function(err, entry) {
        if (err) {
            res.send("There was a problem deleting an entry to the database: " + err);
        }
        else {
            console.log('Item deleted');
            res.redirect("/collection") ;
        }

    });
});
module.exports = router;