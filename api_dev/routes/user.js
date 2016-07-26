'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/user.js');
var jwt = require('jwt-simple');
var passport = require('passport');
var nodemailer = require('nodemailer');

var config = require('../config/database.js');

require('../config/passport')(passport);

router.post('/signup', function(req, res, next) {
    if (!req.body.email || !req.body.password) {
        res.json({success: false, msg: 'Please pass email and password.'});
    } else {
        var newUser = new User({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});

router.post('/authenticate', function(req, res, next) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      return res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, user: user, msg: 'Authentication success.', token: 'JWT ' + token });
        } else {
          return res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!', user: user});
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

router.put('/changePwd/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {

    post.password = req.body.password;

    post.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }

      var token = jwt.encode(post, config.secret);
      post.token = token;
      res.json({success: true, user: post});
    });

    if (err) return next(err);
  });

});

router.put('/changePict/:id', function(req, res, next) {
 User.findById(req.params.id, function (err, post) {

    post.picture = req.body.picture;

    post.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }

      res.json({success: true});
    });

    if (err) return next(err);
  });

});

router.get('/resetPwd/:email', function(req, res, next) {
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

// setup e-mail data with unicode symbols
  var mailOptions = {
    from: 'foo@blurdybloop.com', // sender address
    to: req.params.email, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
  };


// send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ');
  });
});

/*getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};*/

module.exports = router;

