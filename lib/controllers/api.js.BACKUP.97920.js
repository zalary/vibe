'use strict';

var mongoose = require('mongoose');
/**
 * Get awesome things
 */
<<<<<<< HEAD
exports.awesomeThings = function(req, res) {
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};

exports.addSongs = function(req, res) {
  console.log(req);
};
=======
// exports.awesomeThings = function(req, res) {
//   return Thing.find(function (err, things) {
//     if (!err) {
//       return res.json(things);
//     } else {
//       return res.send(err);
//     }
//   });
// };
>>>>>>> soundcloudfrontend
