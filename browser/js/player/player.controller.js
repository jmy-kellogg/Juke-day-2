/* global juke */
'use strict';

juke.controller('PlayerCtrl', function ($scope, PlayerFactory) {

  $scope.getCurrentSong = function(){
    return PlayerFactory.getCurrentSong();
  }
  $scope.isPlaying = function() {
    return PlayerFactory.isPlaying();
  }
  $scope.progress = function() {
    return PlayerFactory.getProgress()*100;
  }

  // main toggle
  $scope.toggle = function (song) {
    PlayerFactory.toggle(song);
  };

  $scope.next = function () {
    PlayerFactory.next();
  };

  $scope.prev = function () {
    PlayerFactory.previous();
  };

  $scope.handleProgressClick = function (evt) {
    PlayerFactory.seek(evt);
  };

});
