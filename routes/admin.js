var express = require('express');
var router = express.Router();
var moment = require('moment');
var ObjectId = require('mongodb').ObjectId;
var assert = require('assert');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var db = require('../db');
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
        collection.find().sort({added: -1}).exec(function(err, entry){
            console.log("Thesis entries loaded.");
            res.render('collection', { title: 'Collection', entries: entry, moment: moment });
        });
    }
});

router.get('/new', function(req, res, next){
    res.render('add', { title: 'Join', sent: "" });
});

router.post('/new', function(req, res, next){
    var collection = Thesis.find();
    var findcount = 0;

    //set default image
    var image1 = req.body.image1 && req.body.image1.trim();
    var image2 = req.body.image2 && req.body.image2.trim();
    var image3 = req.body.image3 && req.body.image3.trim();
    if(image1 == "" && image2 == "" && image3 == ""){
        image1 = "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg";
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

    if (thesis=="" || member1=="" || member2=="" || adviser1=="" || adviser2==""){
        // render error message
        return res.send({ message: 'Please fill up the required fields.' });
    } else {
        var dataToSave = {
            thesis:         thesis,
            subtitle:       req.body.subtitle && req.body.subtitle.trim(),
            description:    description,
            year:           req.body.year,
            tags:           JSON.parse(req.body.tags),
            members: [
                            member1,
                            member2,
                            req.body.member3 && req.body.member3.trim(),
                            req.body.member4 && req.body.member4.trim(),
                            req.body.member5 && req.body.member5.trim()
            ],
            advisers: [
                            adviser1,
                            adviser2
            ],
            fileURL :       req.body.fileURL,
            fileHandle :    req.body.fileHandle,
            images: [
                            image1,
                            image2,
                            image3
            ],
            youtube:            req.body.youtube && req.body.youtube.trim()
        };
        console.log(dataToSave);
        var thesisnew = new Request({
            username : req.user.username,
            details : dataToSave,
            type : 'add'
        });
        thesisnew.save(function(err, entry){
            if(err) {
                console.log('Error adding entry!');
                return res.send({ message : err });
            }
            console.log('Entry added successfully!');
            res.status(200).send({ message: 'Success!' });
        });
    }

});

router.get('/:thesisId', function(req, res, next){
    var thesisId = req.params.thesisId;
    var collection = Thesis.find();
    collection.findOne({ '_id':ObjectId(thesisId) }, function(err, entry) {
        // if(!entry.length && !err){
        //     return res.redirect('/collection');
        // }
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
                    entry: entry,
                    moment: moment
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

    //set default image
    var image1 = req.body.image1 && req.body.image1.trim();
    var image2 = req.body.image2 && req.body.image2.trim();
    var image3 = req.body.image3 && req.body.image3.trim();
    if(image1 == "" && image2 == "" && image3 == ""){
        image1 = "https://s24.postimg.org/4n4g07o9x/img_bg_1.jpg";
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

    if (thesis=="" || member1=="" || member2=="" || adviser1=="" || adviser2==""){
        // render error message
        return res.send({ message: 'Please fill up the required fields.' });
    } else {
        var dataToSave = {
            id:             ObjectId(thesisId),
            thesis:         thesis,
            subtitle:       req.body.subtitle && req.body.subtitle.trim(),
            description:    description,
            year:           req.body.year,
            tags:           JSON.parse(req.body.tags),
            members: [
                            member1,
                            member2,
                            req.body.member3 && req.body.member3.trim(),
                            req.body.member4 && req.body.member4.trim(),
                            req.body.member5 && req.body.member5.trim()
            ],
            advisers: [
                            adviser1,
                            adviser2
            ],
            fileURL :       req.body.fileURL,
            fileHandle :    req.body.fileHandle,
            images: [
                            image1,
                            image2,
                            image3
            ],
            youtube:            req.body.youtube && req.body.youtube.trim()
        };
        console.log(dataToSave);
        var thesisnew = new Request({
            username : req.user.username,
            details : dataToSave,
            type : 'edit'
        });
        thesisnew.save(function(err, entry){
            if(err) {
                console.log('Error adding request!');
                return res.send({ message : err });
            }
            console.log('Reques added successfully!');
            res.status(200).send({ message: 'Edit request for that entry was sent to admin. An email will be sent to you when your request is approved', redirect: '/collection/'+thesisId });
        });
    }

});
router.delete('/:thesisId',function(req,res,next) {
    var thesisId = req.params.thesisId;
    var collection = Thesis.find();

    collection.findOne({ '_id': ObjectId(thesisId) },  function(err, entry) {
        if (err) {
            res.send({'message' : "There was a problem deleting an entry to the database: " + err});
        } else {
          Request.find({'details.id': thesisId, 'type' : 'delete'}, function(err, exist){
            if(exist.length && !err){
              res.send({'message' : 'Delete request for that entry already exists.'});
              console.log('Exist')
            } else if(!exist.length && !err){
              var data = new Request({
                username : req.user.username,
                details: {
                  id : ObjectId(thesisId),
                  thesis : entry.thesis,
                  subtitle : entry.subtitle,
                  description : entry.description,
                  year : entry.year,
                  tags : entry.tags,
                  members : entry.members,
                  advisers : entry.advisers,
                  fileURL : entry.fileURL,
                  fileHandle : entry.fileHandle,
                  images : entry.images,
                  youtube : entry.youtube
                },
                type : 'delete'
              });
              data.save();
              console.log('Request for delete sent.');
              res.status(200).send({'message' : 'Request for delete was sent to admin. An email will be sent to you when your request is approved.'});
              console.log(entry);
            } else {
                res.send({'message': 'Thesis entry was not found.'});
            }
          });
        }

    });
});
module.exports = router;