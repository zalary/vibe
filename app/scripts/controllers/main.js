'use strict';

angular.module('vibeApp')
	.controller('MainCtrl', function ($scope, $http) {
		$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

		SC.initialize({
			client_id: '5b99452b5af12d3c60b5c44999140f09',
			redirect_uri: '/'
		});


		var iframeElement   = document.getElementById('sc-widget');
		var widget        = SC.Widget(iframeElement);

		// SC.connect(function() {
		//   SC.get('/me', function(me) { 
		//    // any sign in stuff we need 
		//   });
		// });

		var genre = "seapunk"; // get from user input

		var queue = [];	
		var atrack = queue[Math.floor(Math.random() * queue.length)];

		//make this event based
		
		var addTracks = function(){
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

		var loadPlayer = function(){
			atrack = queue[Math.floor(Math.random() * queue.length)];
			widget.load(atrack.url, {auto_play: true});
			var currentSongIndex = queue.indexOf(atrack);
			queue[currentSongIndex].playcount++;
		};

		var pausePlayer = function(){
			widget.pause();
		};

		var playPlayer = function(){
			widget.play();
		};

		var togglePlayer = function(){
			//toggles play/pause
			widget.toggle();
		};

		var skip = function(){
			var skipSong = widget.getcurrentsound().permalink_url;
			var skipDex = queue.indexOf({url: skipsong});
			queue[skipdex].skip = true;
			widget.next();
		}

		widget.bind(SC.Widget.Events.FINISH, function(){
			var randex = Math.floor(Math.random() * queue.length);
			atrack = queue[randex];
			widget.load(atrack.url, {auto_play: true});
			queue[randex].playcount++;
		});


});
