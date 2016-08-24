juke.controller('ArtistCtrl', function($scope, $rootScope, $log, ArtistFactory, PlayerFactory) {
	$scope.show = false;

	$scope.$on('turnOffMainViews', function(){
	  $scope.show = false;
	})

	$scope.$on('showSingleArtist', function(event, _id) {
	  $scope.show = true;

	  if (ArtistFactory.fetchById(_id).hasOwnProperty('albums')) {
	    console.log("got cached version", ArtistFactory.fetchById(_id));
	    $scope.artist = ArtistFactory.fetchById(_id);
	  } else {
	  	console.log("got promise");
	  	ArtistFactory.fetchById(_id)
	  	.then(function (artist) {
	  		PlayerFactory.setCurrentAlbum(artist);
	  	  $scope.artist = artist;
	  	})
	  	.catch($log.error);
	  }
	  
	  
	})

	$scope.getCurrentSong = function(){
		return PlayerFactory.getCurrentSong();
	}
	$scope.isPlaying = function() {
		return PlayerFactory.isPlaying();
	}

	// main toggle
	$scope.toggle = function (song) {
		console.log(song)
		PlayerFactory.toggle(song);
	};

	$scope.gotoAlbum = function(album) {
		$rootScope.$broadcast('turnOffMainViews');
		$rootScope.$broadcast('showSingleAlbum', album);
	}

});