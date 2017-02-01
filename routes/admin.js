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
var username = 'username';
var Thesis = require('../models/thesis');
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
router.get('/', function(req, res, next){
    var collection = Thesis.find();
    var count = collection.count();
    if (count == 0) {
        console.log("Collection is empty.");
    } else {
        collection.find().sort({thesis: 1}).exec(function(err, entry){
            console.log("Thesis entries loaded.");
            res.render('collection', { title: 'Collection', entries: entry });
        });
    }
});

router.get('/new', function(req, res, next){
    res.render('add', { title: 'Join', sent: ""});
});

router.post('/new', function(req, res, next){
    var collection = Thesis.find();
    dt = datetime.create();
    var formatted = dt.format('m/d/Y');
    var findcount = 0;

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

    var thesis = req.body.thesis && req.body.thesis.trim();
    var member1 = req.body.member1 && req.body.member1.trim();
    var member2 = req.body.member2 && req.body.member2.trim();
    var adviser1 = req.body.adviser1 && req.body.adviser1.trim();
    var adviser2 = req.body.adviser2 && req.body.adviser2.trim();

    findcount = collection.count({thesis: thesis});

    if (thesis=="" || member1=="" || member2=="" || adviser1=="" || adviser2==""){
        // render error message
        res.render('add', {title: 'Join', sent: 'no', error: 'Please fill up the required fields.'});
        return;
    } else if (findcount > 0){
        console.log(findcount);
        // render error message
        res.render('add', {title: 'Join', sent: 'no', error: 'Found a research with the same title.'});
        return;
    } else {
        var dataToSave = {
            thesis:             thesis,
            subtitle:       req.body.subtitle && req.body.subtitle.trim(),
            members:            [
                member1,
                member2,
                req.body.member3 && req.body.member3.trim(),
                req.body.member4 && req.body.member4.trim(),
                req.body.member5 && req.body.member5.trim()
            ],
            advisers:       [
                adviser1,
                adviser2
            ],
            sentence:       sentence,
            description:    description,
            image:              imageurl,
            youtube:            req.body.youtube && req.body.youtube.trim(),
            added:              formatted,
            updated:            formatted
        };
        console.log(dataToSave);
        var thesisnew = new Request({
            username : username,
            details : dataToSave,
            type : 'add'
        });
        thesisnew.save(function(err, entry){
            if(err) {
                console.log('Error adding entry!');
                return;
            }
            console.log('Entry added successfully!');
            res.render('add', {title: 'Join', sent: 'yes'});

        });
    }

});

router.get('/:thesisId', function(req, res, next){
    var thesisId = req.params.thesisId;
    var collection = Thesis.find();
    collection.findOne({ _id:ObjectId(thesisId) }, function(err, entry) {
        var imageurl = entry.image;
        if(imageurl == "" || imageurl == "undefined" || imageurl == null){
            imageurl = "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg";
            entry.image = imageurl;
        }
        var member3 = entry.members[2];
        if(member3 == "" || member3 == "undefined" ||member3 == null){
            member3 = "";
            entry.members[2] = member3
        }
        var member4 = entry.members[3];
        if(member4 == "" || member4 == "undefined" ||member4 == null){
            member4 = "";
            entry.members[3] = member4
        }
        var member5 = entry.members[4];
        if(member5 == "" || member5 == "undefined" ||member5== null){
            member5 = "";
            entry.members[4] = member5
        }
        var subtitle = entry.subtitle;
        if(subtitle == "" || subtitle == "undefined" || subtitle == null){
            subtitle = "";
            entry.subtitle = subtitle;
        }
        var youtube = entry.youtube;
        if(youtube == "" || youtube == "undefined" || youtube == null){
            youtube = "";
            entry.youtube = youtube
        }
        var item = {
            thesis:         entry.thesis,
            subtitle:       entry.subtitle,
            members:            [
                entry.members[0],
                entry.members[1],
                entry.members[2],
                entry.members[3],
                entry.members[4]
            ],
            advisers:       [
                entry.advisers[0],
                entry.advisers[1]
            ],
            sentence:       entry.sentence,
            description:    entry.description,
            image:              entry.image,
            youtube:            entry.youtube
        };
        if (err) {
            res.send("There's a value of undefined" + err);
        }
        else {
            collection.findOneAndUpdate(item, function (err, entry) {

                res.render('details', {
                    title: 'Collection',
                    entry: entry
                });
            });
        }
    });

});

router.get('/:thesisId/edit', function(req, res, next){
    var thesisId = req.params.thesisId;
    var collection = Thesis.find();
    collection.findOne({ _id: new ObjectId(thesisId)}, function(err, entry){
        res.render('edit', {title: 'Collection', entry: entry});
    });
});

router.put('/:thesisId', function(req,res, next) {
    var thesisId = req.params.thesisId;
    var collection = Thesis.find();
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

    var thesis = req.body.thesis && req.body.thesis.trim();
    var member1 = req.body.member1 && req.body.member1.trim();
    var member2 = req.body.member2 && req.body.member2.trim();
    var adviser1 = req.body.adviser1 && req.body.adviser1.trim();
    var adviser2 = req.body.adviser2 && req.body.adviser2.trim();
    var youtube = req.body.youtube && req.body.youtube.trim();
    var subtitle = req.body.subtitle && req.body.subtitle.trim();

    if (thesis=="" || member1=="" || member2=="" || adviser1=="" || adviser2==""){
        // render error message
        collection.findOne({ _id: new ObjectId(thesisId)}, function(err, entry){
            res.redirect('/collection/'+thesisId+'/edit');
        });
        return;
    } else {
        // Save only edited values
         var item = collection.findOne({_id: new ObjectId(thesisId)});
         if (subtitle == item.subtitle){
            subtitle = "";
         }
         if (sentence == item.sentence){
            sentence = "";
         }
         if (description == item.description){
            description = "";
         }
         if (imageurl == item.imageurl){
            imageurl = "";
         }
         if (youtube == item.youtube){
            youtube = "";
         }

        var dataToSave = {
                    id : thesisId,
                    thesis:             thesis,
                    subtitle:       subtitle,
                    members:            [
                        member1,
                        member2,
                        req.body.member3 && req.body.member3.trim(),
                        req.body.member4 && req.body.member4.trim(),
                        req.body.member5 && req.body.member5.trim()
                    ],
                    advisers:       [
                        adviser1,
                        adviser2
                    ],
                    sentence:       sentence,
                    description:    description,
                    image:              imageurl,
                    youtube:            youtube,
                    updated:            formattedDate
                };

        var data = new Request({
                    username : username,
                    details : dataToSave,
                    type : 'edit'
                })

        data.save(function(err, entry) {

            if (err) {
                res.send("There was a problem in sending your request: " + err);
            }
            else {
                res.format({
                    html: function () {
                        console.log(dataToSave);
                        res.redirect("/collection/" + thesisId);
                    },
                    //JSON responds showing the updated values
                    json: function () {
                        res.json(entry);
                    }
                });

            }
        });
    }

});
router.delete('/:thesisId',function(req,res,next) {
    var thesisId = req.params.thesisId;
    var collection = Thesis.find();

    collection.findOne({ '_id': ObjectId(thesisId) },  function(err, entry) {
        if (err) {
            res.send("There was a problem deleting an entry to the database: " + err);
        }
        else {
            Request.find({'details.id': thesisId, 'type' : 'delete'}, function(err, exist){
                if(exist.length && !err){
                    req.flash('error_msg', 'Delete request for that entry already exists.');
                    res.redirect('/collection/'+thesisId);
                    console.log('Exist')
                } else if(!exist.length && !err){
                    var data = new Request({
                        username : req.user.username,
                        details: {
                            id : thesisId,
                            thesis : entry.thesis,
                            subtitle : entry.subtitle,
                            members : entry.members,
                            advisers : entry.advisers,
                            description : entry.description,
                            sentence : entry.sentence,
                            image : entry.image,
                            youtube : entry.youtube,
                            added : entry.added,
                            updated : entry.updated
                        },
                        type : 'delete'
                    });
                    data.save();
                    console.log('Request for delete sent.');
                    req.flash('success_msg', 'Request for delete was sent to admin.');
                    res.redirect("/collection/"+thesisId) ;
                    console.log(entry);
                } else {
                    res.status(500).send({'message': 'not found'});
                }
            })
        }

    });
});
module.exports = router;