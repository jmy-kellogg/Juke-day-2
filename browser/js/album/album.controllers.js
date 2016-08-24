/* global juke */
'use strict';

juke.controller('AlbumCtrl', function ($scope, $log, StatsFactory, AlbumFactory, PlayerFactory) {

  $scope.show = false;
  // load our initial data
   // $log service can be turned on and off; also, pre-bound
  // .then(function(){
  //   return StatsFactory.totalTime($scope.album);
  // })
  // .then(function(duration) {
  //   $scope.duration = duration;
  // })
  $scope.getCurrentSong = function(){
    return PlayerFactory.getCurrentSong();
  }
  $scope.isPlaying = function() {
    return PlayerFactory.isPlaying();
  }

  // main toggle
  $scope.toggle = function (song) {
    PlayerFactory.toggle(song);
  };

  $scope.$on('turnOffMainViews', function(){
    $scope.show = false;
  })

  $scope.$on('showSingleAlbum', function(event, _album) {
    $scope.show = true;

    if (AlbumFactory.fetchById(_album.id).hasOwnProperty('imageUrl')) {
      console.log("got cached version", AlbumFactory.fetchById(_album.id));
      $scope.album = AlbumFactory.fetchById(_album.id);
    } else {
      console.log("got promise")
      AlbumFactory.fetchById(_album.id)
      .then(function (album) {
        $scope.album = album;
        PlayerFactory.setCurrentAlbum(album);
      })
      .catch($log.error);
    }
    
    
  })

});



