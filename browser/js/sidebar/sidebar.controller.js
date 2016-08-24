juke.controller('SidebarCtrl', function($scope, $rootScope) {

	$scope.artists = false;
	$scope.albums = true;
	
	$scope.viewAlbums = function(){
		$rootScope.$broadcast('turnOffMainViews');
		$rootScope.$broadcast('showAlbums');
		$scope.artists = false;
		$scope.albums = true;
	};

	$scope.viewAllArtists = function(){
		$rootScope.$broadcast('turnOffMainViews');
		$rootScope.$broadcast('showArtists');
		$scope.artists = true;
		$scope.albums = false;
	};

	


});