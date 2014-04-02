'use strict';

angular.module('vibeApp')
	.controller('MainCtrl', function ($scope, $http) {

		SC.initialize({
			client_id: '5b99452b5af12d3c60b5c44999140f09',
			redirect_uri: '/'
		});

		$scope.getMe = function(){
			$http({method: 'GET', url: '/api/users/me'}).
			    success(function(data, status, headers, config) {
			      // this callback will be called asynchronously
			      // when the response is available
			      console.log(data);
			});
		}

		var iframeElement = document.getElementById('sc-widget');
		$scope.widget = SC.Widget(iframeElement);

		// SC.connect(function() {
		//   SC.get('/me', function(me) {
		//    // any sign in stuff we need
		//   });
		// });

		var genre = "seapunk"; // get from user input

		var queue = [{artist: 'BIGKRIT', title: 'Country Rap Tune', url: 'http://soundcloud.com/bigkrit/08-country-rap-tune'}];
    	var atrack = queue[Math.floor(Math.random() * queue.length)];

		//make this event based fdsafdsa

		$scope.addTracks = function(){
			SC.get('/tracks', { q: genre }, function(tracks) {
				// var currentPlaylist; //figure this out somehow -- current user playlist current: true
			    for(var i = 0; i < 10; i++){
			  	// the new song to the database, parsed to the object we want:
					var newTrack = {title: tracks[i].title, artist: tracks[i].user.username, url: tracks[i].permalink_url};
					// console.log(newTrack);
					$http({
						method: "POST",
						url: "/api/songs",
						data: newTrack

					}).success(function(res){
			  			queue.push({url: res.url, playcount: 0, skip: false});
					});
			}
			});
		};

		$scope.currentSong;

		$scope.loadPlayer = function(){
			atrack = queue[Math.floor(Math.random() * queue.length)];
			$scope.widget.load(atrack.url, {auto_play: true});
			var currentSongIndex = queue.indexOf(atrack);
			queue[currentSongIndex].playcount++;
		};

		$scope.pausePlayer = function(){
			$scope.widget.pause();
		};

		$scope.playPlayer = function(){
			$scope.widget.play();
		};

		$scope.togglePlayer = function(){
			$scope.widget.toggle();
		};

		$scope.skip = function(){

			$scope.widget.getCurrentSound(function(data){
				var endTime;
				endTime = data.duration;

				var skipSong = data.permalink_url;
				for(var i = 0; i < queue.length; i++){
					if(queue[i].url === skipSong){
						// console.log(queue[i]);
						queue[i].skip = true;
					}
				}
				// console.log($scope.widget);
				$scope.widget.seekTo(endTime);
			});

		}

		$scope.widget.bind(SC.Widget.Events.FINISH, function(){
			var randex = Math.floor(Math.random() * queue.length);
			atrack = queue[randex];
			$scope.widget.load(atrack.url, {auto_play: true});
			queue[randex].playcount++;
			console.log(queue.length);
		});

		$scope.loadPlayer();
		$scope.addTracks();

});
