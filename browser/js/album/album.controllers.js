/* global juke */
'use strict';

juke.controller('AlbumCtrl', function ($scope, $log, StatsFactory, AlbumFactory, PlayerFactory) {

  // load our initial data
  AlbumFactory.fetchAll()
  .then(function (albums) {
     return AlbumFactory.fetchById(1);
  })
  .then(function (album) {
    $scope.album = album;
    PlayerFactory.setCurrentAlbum(album);
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound
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

});



