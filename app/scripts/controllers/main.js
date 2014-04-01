'use strict';

angular.module('vibeApp')
	.controller('MainCtrl', function ($scope, $http) {
		$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

		SC.initialize({
			client_id: '5b99452b5af12d3c60b5c44999140f09',
		  // redirect_uri: '/'
		});

		// SC.connect(function() {
		//   SC.get('/me', function(me) { 
		//    // any sign in stuff we need 
		//   });
		// });

		var genre = "seapunk"
		var addQueue = [];

		SC.get('/tracks', { q: genre }, function(tracks) {
			var currentPlaylist; //figure this out somehow -- current user playlist current: true 
		    for(var i = 0; i < 10; i++){
		  	// the new song to the database, parsed to the object we want: 
				var newTrack = {title: tracks[i].title, artist: tracks[i].user.username, url: tracks[i].permalink_url};
				// console.log(newTrack);

				$http({
					method: "POST",
					url: "/api/songs",
					data: newTrack

				}).success(function(res){
					console.log(res.url);
		  			addQueue.push({url: res.url, playcount: 0, skip: false});
				});
		}
		  	// another db request:
		// currentPlaylist += addQueue;
		

    });
});
