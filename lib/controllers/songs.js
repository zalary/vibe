'use strict';

var mongoose = require('mongoose'),
    Song = mongoose.model('Song'),
    passport = require('passport');

/**
 * Create song
 */
exports.create = function (req, res, next) {
  var newSong = new Song(req.body);
  newSong.provider = 'local';
  newSong.save(function(err) {
    if (err){
      return res.json(400, err);
    } else {
      return res.json(req);
    }
    });
};