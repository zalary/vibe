'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport');

/**
 * Create user
 */
exports.create = function (req, res, next) {
  if(Object.keys(req.body).length ===1){
    req.body = JSON.parse(Object.keys(req.body)[0]);
  }
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.save(function(err) {
    if (err) {
      console.log(err);
      return res.json(400, err);
    }

    req.logIn(newUser, function(err) {
      if (err) {
        console.log(err);
        return next(err);
      }

      return res.json(req.user.userInfo);
    });
  });
};

/**
 *  Get profile of specified user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(404);

    res.send({ profile: user.profile });
  });
};

/**
 * Change password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return res.send(400);

        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};


exports.updatePlaylist = function(req, res, next){
  var userId = req.user._id;
  var query = {_id: userId};
  User.findOneAndUpdate(query, {chill: req.body.chill, happy: req.body.happy, sad: req.body.sad, party: req.body.party}, function(err, data){
    console.log(data);
  });
};


exports.checkPlaylist = function(req, res, next) {
  var mood = req.params.mood;
  User.find({ _id: req.user._id }, function (err, person) {
    if (err) return next(err);
    if (person[0][mood].songs.length === 0) {
      res.send("");
    } else {
      res.send("ready");
    }
  });
};

exports.addGenre = function (req, res, next) {
  var mood = req.body.mood;
  var genre = req.body.genre;
  User.find({ _id: req.user._id }, function (err, person) {
    if (err) return next(err);
    person[0][mood].genres.push(genre);
    person[0].save();
    res.send(200);
  })
};


/**
 * Get current user
 */
exports.me = function(req, res) {
  res.json(req.user || null);
};
