var express = require('express');
var User = require('../models/User');
var router = express.Router();

/* GET home page. */
router.route('/user/checkemail').get(function(req, res, next) {
    console.log(req.query.email);
    User.findOne({
        email:req.query.email
    },['_id'],{},function(err,user){
        if(err){
            next(err);
            return;
        }
        if(user != null) {
            res.json({
                result: "success", data: "exists"
            });
        }
    });

});

module.exports = router;
