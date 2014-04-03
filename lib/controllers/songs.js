// 'use strict';

var mongoose = require('mongoose');
var Song = mongoose.model('Song');

exports.create = function (req, res, next) {
	var obj;
	for (var key in req.body){
		obj = JSON.parse(key);
	}

	var newSong = new Song({artist: obj.artist, title: obj.title, url: obj.url});
	// console.log(newSong);
	// console.log(obj);
	newSong.save(function(err) {
	    if (err){
			return res.json(400, err);
	    } else {
			return res.json(obj);
	    }
    });

};