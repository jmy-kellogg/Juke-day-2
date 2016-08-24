juke.controller('AlbumsCtrl', function($scope, AlbumFactory) {

	AlbumFactory.fetchAll()
		.then(function(albums) {
			$scope.albums = albums;
		})


})