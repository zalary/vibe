'use strict';

angular.module('vibeApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;

      SC.initialize({
		  client_id: '5b99452b5af12d3c60b5c44999140f09',
		  redirect_uri: '/'
		});

		// SC.connect(function() {
		//   SC.get('/me', function(me) { 
		//    // any sign in stuff we need 
		//   });
		// });

		// SC.get('/tracks', { q: genre }, function(tracks) {
		// 	var currentPlaylist;
		// 	var addLength = currentPlaylist.list.length/2;
		// 	addQueue = [];
		//     for(i = 0; i < addLength.length; i++){
		//   	// the new song to the database, parsed to the object we want: 
		//   		{title: tracks[i].title, artist: tracks[i].user.username, url: tracks[i].permalink_url, tags: [genre]}

		//   	// add the new song to the array on res callback
		//   		addQueue.push({id: res.id, playcount: 0, skip: false}) 

		//     }
		//   	// another db request:
		//     currentPlaylist += addQueue;
		// };

    });
  });
