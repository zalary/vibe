'use strict';

var mongoose = require('mongoose');


var SongSchema = new mongoose.Schema({
  title: String,
  artist: String,
  url: String,
  tags: [] 
});

/**
 * Validations
 */
// SongSchema.path('title').validate(function (data) {
//   return data.title !== undefined;  
// }, 'Song must have a title');

// SongSchema.path('artist').validate(function (data) {
//   return data.artist !== undefined;  
// }, 'Song must have an artist');

// SongSchema.path('url').validate(function (data) {
//   return data.url !== undefined;  
// }, 'Song must have a link');

// SongSchema.path('tags').validate(function (data) {
//  	return true;
// }, 'Tags are optional');

module.exports = mongoose.model('Song', SongSchema);
