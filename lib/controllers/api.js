'use strict';

var mongoose = require('mongoose');
/**
 * Get awesome things
 */
<<<<<<< HEAD
// exports.awesomeThings = function(req, res) {
//   return Thing.find(function (err, things) {
//     if (!err) {
//       return res.json(things);
//     } else {
//       return res.send(err);
//     }
//   });
// };
=======
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

};
>>>>>>> 49c58bc64521e1ceb319e63d902e05da7c21c163
