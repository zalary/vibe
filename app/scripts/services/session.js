'use strict';

angular.module('vibeApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
