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


router.get('/get/allUserPost/:id/', function(req, res, next) {
    var respon = DBclient.getAllPostOfUser(req.params.id)
    respon.then( (rez) => {
        res.json(rez);
    });
    respon.catch( (err) => {
        console.error(err);
    });
});


router.get('/get/NoReplyPost/:id/', function(req, res, next) {
    var respon = DBclient.getNoReplyPostOfUser(req.params.id)
    respon.then( (rez) => {
        res.json(rez);
    });
    respon.catch( (err) => {
        console.error(err);
    });
});

router.get('/get/ReplyPost/:id/', function(req, res, next) {
    var respon = DBclient.getRepliesPostOfUser(req.params.id)
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


router.get('/get/following/:id/', function(req, res, next) {
    var respon = DBclient.getFollowersOfID(req.params.id)
    respon.then( (rez) => {
        res.json(rez);
    });
    respon.catch( (err) => {
        console.error(err);
    });
});


router.get('/get/followers/:id/', function(req, res, next) {
    var respon = DBclient.getFollowingOfID(req.params.id)
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

router.get('/get/tweet/likes/:id/', function(req, res, next) {
    var respon = DBclient.getLikesOfTweet(req.params.id)
    respon.then( (rez) => {
        res.json(rez);
    });
    respon.catch( (err) => {
        console.error(err);
    });
});


router.get('/get/tweet/repost/:id/', function(req, res, next) {
    var respon = DBclient.getRepostOfTweet(req.params.id)
    respon.then( (rez) => {
        res.json(rez);
    });
    respon.catch( (err) => {
        console.error(err);
    });
});


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


router.get('/get/post/all',
function(req, res, next) {
    var respon = DBclient.getAllTweets()
    respon.then( (rez) => {
        res.json(rez);
    });
    respon.catch( (err) => {
        console.error("All Tweets:", err)
        next(err);
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

router.put('/put/post/:TID/:author_UID/:text/', function(req, res, next) {
    var respon = DBclient.createTweet(req.params.TID, req.params.author_UID, req.params.text, null, null)
    respon.then( (rez) => {
        res.json(rez);
    });
    respon.catch( (err) => {
        next(err);
    });
});



//report_tweet
router.put('/put/like/user/:userID/tweet/:tweetID/Author/:aUID', function(req, res, next) {
    var respon = DBclient.likeTweet(req.params.userID,req.params.tweetID,req.params.aUID)
    respon.then( (rez) => {
        res.json(rez);
    });
    respon.catch( (err) => {
        next(err);
    });
});


//report_tweet
router.put('/put/repost/user/:userID/tweet/:tweetID/Author/:aUID', function(req, res, next) {
    var respon = DBclient.repostTweet(req.params.userID,req.params.tweetID,req.params.aUID)
    respon.then( (rez) => {
        res.json(rez);
    });
    respon.catch( (err) => {
        next(err);
    });
});

//post values 
router.put('/put/follow/:followie/:follower/', function(req, res, next) {
    var respon = DBclient.followUser(req.params.followie,req.params.follower)
    respon.then( (rez) => {
        res.json(rez);
    });
    respon.catch( (err) => {
        next(err);
    });
});




module.exports = router;