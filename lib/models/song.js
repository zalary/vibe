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
SongSchema.path('awesomeness').validate(function (data) {
  var checkSong = data.title != undefined && data.artist != undefined && data.url != undefined && data.tags.length >= 0;
  return checkSong;  
}, 'Song must have song properties');

mongoose.model('Song', SongSchema);
