var express = require('express');
var router = express.Router();
var DBclient = require('../connector.js');



//user gets
router.get('/get/user/:id/', function(req, res, next) {
    var respon = DBclient.getUser(req.params.id)
    respon.then( (rez) => {
        res.json(rez);
    });
    respon.catch( (err) => {
        console.error(err);
    });
});


router.get('/get/userPost/:id/', function(req, res, next) {
    var respon = DBclient.getPostOfUser(req.params.id)
    respon.then( (rez) => {
        res.json(rez);
    });
    respon.catch( (err) => {
        console.error(err);
    });
});

router.get('/get/repost/:id/', function(req, res, next) {
    var respon = DBclient.getRepostOfUser(req.params.id)
    respon.then( (rez) => {
        res.json(rez);
    });
    respon.catch( (err) => {
        console.error(err);
    });
});


router.get('/get/likes/:id/', function(req, res, next) {
    var respon = DBclient.getLikeOfUser(req.params.id)
    respon.then( (rez) => {
        res.json(rez);
    });
    respon.catch( (err) => {
        console.error(err);
    });
});


router.get('/get/timeline/:id/', function(req, res, next) {
    var respon = DBclient.getTimelineOfUser(req.params.id)
    respon.then( (rez) => {
        res.json(rez);
    });
    respon.catch( (err) => {
        console.error(err);
    });
});



// tweet gets 
router.get('/get/tweet/:id/', function(req, res, next) {
    var respon = DBclient.getTweetOfID(req.params.id)
    respon.then( (rez) => {
        res.json(rez);
    });
    respon.catch( (err) => {
        console.error(err);
    });
});


router.get('/get/responses/:id/', function(req, res, next) {
    var respon = DBclient.getResponsesOfTweet(req.params.id)
    respon.then( (rez) => {
        res.json(rez);
    });
    respon.catch( (err) => {
        console.error(err);
    });
});


router.put('/post/user/:id/:fn/:ln/:username/:pass_hash/', function(req, res, next) {
    var respon = DBclient.creatUser(req.params.id, req.params.fn, req.params.ln, req.params.username, req.params.pass_hash,)
    console.log("top of put", respon);

    respon.then( (rez) => {
        console.log("We out here");
        res.json(rez);
    });
    respon.catch( (err) => {
        console.log("We in here");
        console.error("UHOH", err);
        next(err);
    });
    console.log("Bottom of put");
});

module.exports = router;