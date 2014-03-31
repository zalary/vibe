'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var SongSchema = new Schema({
  title: String,
  artist: String,
  url: String,
  tags: [] 
});

/**
 * Validations
 */
SongSchema.path('title').validate(function (data) {
  return data.title !== undefined;  
}, 'Song must have a title');

SongSchema.path('artist').validate(function (data) {
  return data.artist !== undefined;  
}, 'Song must have an artist');

SongSchema.path('url').validate(function (data) {
  return data.url !== undefined;  
}, 'Song must have a link');

SongSchema.path('tags').validate(function (data) {
 	return data.tags.length >= 0;
}, 'Tags are optional');

mongoose.model('Song', SongSchema);
