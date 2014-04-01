'use strict';

angular.module('vibeApp')
  .controller('SongCtrl', function ($scope, $http) {
    $http.get('/api/songs').success(function(song) {

    });
  });
