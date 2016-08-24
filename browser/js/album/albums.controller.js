juke.controller('AlbumsCtrl', function($scope, $rootScope, AlbumFactory) {

	$scope.show = true;

	$scope.gotoAlbum = function(album) {
		$rootScope.$broadcast('turnOffMainViews');
		$rootScope.$broadcast('showSingleAlbum', album);
	}

	AlbumFactory.fetchAll()
		.then(function(albums) {
			$scope.albums = albums;
		});

	$scope.$on('showAlbums', function(){
		if ($scope.show) {
			$scope.show = false;
		} else {
			$scope.show = true;
		}
	});

	$scope.$on('turnOffMainViews', function(){
	  $scope.show = false;
	})



})