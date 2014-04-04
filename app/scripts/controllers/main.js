'use strict';

angular.module('vibeApp')
	.controller('MainCtrl', function ($scope, $routeParams, User, $http) {

		SC.initialize({
			client_id: '5b99452b5af12d3c60b5c44999140f09',
		});

		var queue = [{artist: 'diors', title: 'automatic', url: 'https://soundcloud.com/diors/automatic'}];
		var userData;
		var iframeElement = document.getElementById('sc-widget');
		var currentPlaylist;

		$scope.widget = SC.Widget(iframeElement);

		if ( $routeParams.mood === 'party' ){
			currentPlaylist = 'party';
		} else if ( $routeParams.mood === 'happy' ) {
			currentPlaylist = 'happy';
		} else if ( $routeParams.mood === 'sad' ) {
			currentPlaylist = 'sad';
		} else {
			currentPlaylist = 'chill';
		}

		$scope.getMe = function(){
			$http({method: 'GET', url: '/api/users/me'}).
			    success(function(data) {
			      userData = data;
			      queue = data.currentPlaylist.songs;
			      console.log(userData.currentPlaylist);
			});
		};

		$scope.addTracks = function(){
			SC.get('/tracks', { q: userData.currentPlaylist.genres[0] }, function(tracks) {
			    for(var i = 0; i < (10/userData.currentPlaylist.genres.length); i++){
					queue.push({title: tracks[i].title, artist: tracks[i].user.username, url: tracks[i].permalink_url, skip: false, liked: false});
					console.log(queue);
				}
			});
		};

		$scope.loadPlayer = function(){
			var atrack = queue[Math.floor(Math.random() * queue.length)];
			$scope.widget.load( atrack.url, {auto_play: true} );
			var currentSongIndex = queue.indexOf(atrack);
			queue[currentSongIndex].playcount++;
		};

		$scope.like = function(){

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
				for( var i = 0; i < queue.length; i++ ){
					if(queue[i].url === skipSong){
						queue[i].skip = true;
					}
				}
				$scope.widget.seekTo(endTime);
				$scope.widget.play();
			});
		};

		$scope.savePlaylist = function(){
			userData.currentPlaylist.songs = queue;
			console.log('Songs in Queue: ' + userData.currentPlaylist.songs.length);
			console.log(userData);
			$http.post( '/api/users/me', userData );
		};

		$scope.widget.bind(SC.Widget.Events.FINISH, function(){
			var randex = Math.floor(Math.random() * queue.length);
			var atrack = queue[randex];
			$scope.widget.load(atrack.url, {auto_play: true});
			queue[randex].playcount++;
			console.log(queue.length);
		});

  });