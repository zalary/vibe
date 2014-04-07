'use strict';

angular.module('vibeApp')
	.controller('MainCtrl', function ($scope, $routeParams, User, $http, $modal){

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

		$scope.loadPlayer = function(){
			currentSongIndex = [Math.floor(Math.random() * queue.length)];
			var atrack = queue[currentSongIndex];
			var skiptalley = 0;
			var playedtalley = 0; 
			if(atrack.skip === true){
				for(var i = 0; i < queue.length; i++){
					if(queue[i].skip === true){
						skiptalley++;
					};
					if(queue[i].playcount > 0){
						playedtalley++;
					};
				}
				if((skiptalley > (queue.length - 10)) || (playedtalley > (queue.length - 10)) ){
					$scope.addTracks();
				}
				$scope.loadPlayer();
			} else {
				$scope.widget.load( atrack.url, {auto_play: true} );
			}
		};

		$scope.getMe = function(){
			$http({method: 'GET', url: '/api/users/me'}).
			    success(function(data) {
			      userData = data;
			      queue = data[mood].songs;
			      genre = data[mood].genre;
			      if(queue.length === 0){
			      	console.log("there is no playlist");
			      	$scope.createPlaylist();
			      } else {
			      	console.log("there is a playlist");
			      	$scope.loadPlayer();
			      }
			    });
		};

		$scope.createPlaylist = function(){
			SC.get('/tracks', { q: genre, tags: mood }, function(tracks) {
				for(var i = 0; i < 10; i++){
					queue.push({title: tracks[i].title, artist: tracks[i].user.username, url: tracks[i].permalink_url, skip: false, liked: false, tags: tracks[i].tag_list, playcount: 0});
				}
				$scope.loadPlayer();
				window.queue = queue;
			});
		};

		$scope.addTracks = function(){
			SC.get('/tracks', { q: genre, tags: mood }, function(tracks) {
		    for(var i = 0; i < 10; i++){
		    	for(var y = 0; y < queue.length; y++){
		    		if(queue[y].url === tracks[i].permalink_url){
		    			y += queue.length;
		    		} else if (y === queue.length - 1){
		    			queue.push({title: tracks[i].title, artist: tracks[i].user.username, url: tracks[i].permalink_url, skip: false, liked: false, tags: tracks[i].tag_list, playcount: 0});
		    		}
		    	}
				}
			});
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
			if ($scope.playButton === 'glyphicon glyphicon-play') {
				$scope.playButton = 'glyphicon glyphicon-pause';
			} else {
				$scope.playButton = 'glyphicon glyphicon-play';
			}
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

		$scope.dropPlaylist = function(){
			queue = [];
			userData[mood].songs = queue;
			$http.post( '/api/users/me', userData );
		};

		$scope.showPlaylist = function(){
			console.log(queue);
		}

		$scope.listenForEnd = function(){
			$scope.widget.bind(SC.Widget.Events.FINISH, function(){
				currentSongIndex = Math.floor(Math.random() * queue.length);
				var atrack = queue[currentSongIndex];
				$scope.widget.load(atrack.url, {auto_play: true});
				queue[currentSongIndex].playcount++;
			});
		};

		$scope.getMe();
		$scope.listenForEnd();
		$scope.playButton = "glyphicon glyphicon-play";

  });
