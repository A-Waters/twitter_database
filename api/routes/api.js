var express = require('express');
var md5 = require('md5');
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




//put values
router.put('/put/user/:id/:fn/:ln/:username/:pass_hash/', function(req, res, next) {
    var respon = DBclient.creatUser(req.params.id, req.params.fn, req.params.ln, req.params.username, md5(req.params.pass_hash))
    respon.then( (rez) => {
        res.json(rez);
    });
    respon.catch( (err) => {
        next(err);
    });
});


//post values 
router.get('/login/:username/:pass_raw',
function(req, res, next) {
    var respon = DBclient.login(req.params.username, md5(req.params.pass_raw))
    respon.then( (rez) => {
        res.json(rez);
    });
    respon.catch( (err) => {
        console.error("login api:", err)
        next(err);
    });
    
});


module.exports = router;