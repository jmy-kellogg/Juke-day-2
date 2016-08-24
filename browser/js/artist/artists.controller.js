juke.controller('ArtistsCtrl', function($scope, $rootScope, ArtistFactory) {
	$scope.show = false;

	ArtistFactory.fetchAll()
		.then(function(artists) {
			$scope.artists = artists;
		});

	$scope.gotoArtist = function(id) {
		$rootScope.$broadcast('turnOffMainViews');
		$rootScope.$broadcast('showSingleArtist', id);
	}

	$scope.$on('turnOffMainViews', function(){
	  $scope.show = false;
	})

	$scope.$on('showArtists', function(){
		if ($scope.show) {
			$scope.show = false;
		} else {
			$scope.show = true;
		}
	});

});