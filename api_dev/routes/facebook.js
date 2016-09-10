'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = require('../models/post.js');
var Comment = require('../models/comment.js');
var User = require('../models/user.js');
var SubComment = require('../models/subComment.js');
/* GET /post listing. */
router.get('/', function(req, res, next) {
    Post.find().populate({path : 'user_id', model: 'User'}).exec(function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
/* GET /post */
router.get('/:id/comments', function(req, res, next) {
    Comment.find({post_id: req.params.id}).populate({path : 'sub_comments', model: 'SubComment', populate: { path: 'user_id', model: 'User' }}).populate({path : 'votes', model: 'Vote'}).populate({path : 'user_id', model: 'User'}).exec(function (err, comments) {
        if (err) return next(err);
        res.json(comments);
    });
});

/* POST /post */
router.post('/', function(req, res, next) {

    User.findOne({
        facebook_id: req.body.userID
    },function (err, user) {
        if (err) return next(err);
        if(user == null){
             User.create({
                email: req.body.email,
                facebook_id: req.body.userID,
                name: req.body.name,
                password: 'facebookUser'
            }, function (err, user) {
                if (err) return next(err);
                 user.save(function(err) {
                     if (err) {
                         return res.json({success: false, msg: 'Username already exists.'});
                     }
                     res.json(user);
                 });

             });

        }
        else {
            res.json(user);
        }



    })


});

/* GET /post/:id */
router.get('/:id', function(req, res, next) {
    Post.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /post/:id */
router.put('/:id', function(req, res, next) {
    Post.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /post/:id */
router.delete('/:id', function(req, res, next) {
    Post.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
