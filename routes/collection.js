var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var db = require('../db');
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

router.get('/details/:thesisId', function(req, res, next){
    var thesisId = req.params.thesisId;
    var collection = db.get().collection('collection');
    collection.findOne({ _id: new ObjectId(thesisId) }, function(err, entry) {
        res.render('details', {
            title: 'Collection',
            entry: entry
        });
    });

});

router.get('/new', function(req, res, next){
    res.render('add', { title: 'Join', success: ''});
});

router.post('/new', function(req, res, next){
    var collection = db.get().collection('collection');
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
    collection.save(dataToSave, function(err, entry){
            if(err) {
                console.log('Error adding entry!');
                return;
            }
            console.log('Entry added successfully!');
            res.render('add', {title: 'Join', success: 'yes'});
        });
});
module.exports = router;