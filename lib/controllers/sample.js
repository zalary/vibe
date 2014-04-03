var mongoose = require('mongoose');
var Song = mongoose.model('Song');


exports.addSong = function (req, res, next) {
  console.log("Yo");
  res.send(200);
};
