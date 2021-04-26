var express = require('express');
var router = express.Router();
var DBclient = require('../connector.js');


router.get('/', function(req, res, next) {
    var respon = DBclient.getTweetsByUserID();
    
    respon.then( (rez) => {
        res.json(rez);
    });
    
});

module.exports = router;