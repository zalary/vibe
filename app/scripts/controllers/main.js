'use strict';

angular.module('vibeApp')
	.controller('MainCtrl', function ($scope, User, $http) {

		SC.initialize({
			client_id: '5b99452b5af12d3c60b5c44999140f09',
			redirect_uri: '/'
		});

		var queue = [{artist: 'diors', title: 'automatic', url: 'https://soundcloud.com/diors/automatic'}];
		var userData;
		var iframeElement = document.getElementById('sc-widget');
		$scope.currentSong;
		$scope.widget = SC.Widget(iframeElement);

		// log in prompt required

		// choose a mood - page jump
		// 		- store cookie
		// login prompt?
		// next page - request playlist based on cookie
		// $scope.getMe
		// do I have a playlist for this mood?
		// if not, generate - search based on genre
		// else, return stored data


		$scope.getMe = function(){
			$http({method: 'GET', url: '/api/users/me'}).
			    success(function(data, status, headers, config) {
			      userData = data;
			      queue = data.chill.songs;
			      console.log(userData.chill);
			});
		};

		var atrack = queue[Math.floor(Math.random() * queue.length)];

		$scope.addTracks = function(){
			console.log('addTracks button works');

			SC.get('/tracks', { q: userData.chill.genres[0] }, function(tracks) {
			    for(var i = 0; i < (10/userData.chill.genres.length); i++){
					queue.push({title: tracks[i].title, artist: tracks[i].user.username, url: tracks[i].permalink_url, skip: false, liked: false});
					console.log(queue);	
				}
			});
			
		};

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
				$scope.widget.play();
			});

		};

		$scope.savePlaylist = function(){
			userData.chill.songs = queue;
			console.log("Songs in Queue: " + userData.chill.songs.length);
			console.log(userData);
			$http.post('/api/users/me', userData).
			    success(function(data, status, headers, config) {
			      console.log("post request got there");
			  });
		};

		$scope.widget.bind(SC.Widget.Events.FINISH, function(){
			var randex = Math.floor(Math.random() * queue.length);
			atrack = queue[randex];
			$scope.widget.load(atrack.url, {auto_play: true});
			queue[randex].playcount++;
			console.log(queue.length);
		});

});
