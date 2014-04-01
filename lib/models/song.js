'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var SongSchema = new Schema({
  title: String,
  artist: String,
  url: String,
  tags: [] 
});

User = module.exports = mongoose.model('Song', SongSchema);

/**
 * Validations
 */
// SongSchema.path('title').validate(function (data) {
//   return data.title !== undefined;  
// }, 'Song must have a title');

// SongSchema.path('artist').validate(function (data) {
//   return data.artist !== undefined;  
// }, 'Song must have an artist');

SongSchema.path('url').validate(function (value, respond) {
    Song.findOne({ url: value }, function (err, song) {                                                                                                
        if(song) respond(false);                                                                                                                         
    });                                                                                                                                                  
}, 'Song must have a unique url');

SongSchema.path('tags').validate(function (data) {
 	return true;
}, 'Tags are optional');

