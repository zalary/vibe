'use strict';

angular.module('vibeApp')
	.controller('MainCtrl', function ($scope, $routeParams, User, $http) {

		SC.initialize({
			client_id: '5b99452b5af12d3c60b5c44999140f09',
		});

		var queue = [{artist: 'diors', title: 'automatic', url: 'https://soundcloud.com/diors/automatic'}];
		var userData;
		var genre;
		var mood = $routeParams.mood;
		var iframeElement = document.getElementById('sc-widget');
		var currentSongIndex;

		$scope.widget = SC.Widget(iframeElement);

		$scope.getMe = function(){
			$http({method: 'GET', url: '/api/users/me'}).
			    success(function(data) {
			      userData = data;
			      queue = data[mood].songs;
			      genre = data[mood].genre;
			});
		};

		$scope.addTracks = function(){
			SC.get('/tracks', { q: genre, tags: mood }, function(tracks) {
			    for(var i = 0; i < 10; i++){
					queue.push({title: tracks[i].title, artist: tracks[i].user.username, url: tracks[i].permalink_url, skip: false, liked: false, playcount: 0});
				}
			});
		};

		$scope.loadPlayer = function(){
			currentSongIndex = [Math.floor(Math.random() * queue.length)];
			var atrack = queue[currentSongIndex];
			$scope.widget.load( atrack.url, {auto_play: true} );
		};

		$scope.cleanUp = function(){
			console.log(queue.length);
			var i = 0;
			if( queue.length > 50){
				while( i < queue.length ){
					if( queue[i].liked === false && queue[i].playcount > 1 ){
						queue.splice(i, 1);
					}
					i++;
				}
			}
			console.log(queue.length);
		},

		$scope.like = function(){
			queue[currentSongIndex].liked = true;
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
			queue[currentSongIndex].skip = true;
			$scope.loadPlayer();
		};

		$scope.savePlaylist = function(){
			userData[mood].songs = queue;
			$http.post( '/api/users/me', userData );
		};

		$scope.widget.bind(SC.Widget.Events.FINISH, function(){
			currentSongIndex = Math.floor(Math.random() * queue.length);
			var atrack = queue[currentSongIndex];
			$scope.widget.load(atrack.url, {auto_play: true});
			queue[currentSongIndex].playcount++;
		});

  });
