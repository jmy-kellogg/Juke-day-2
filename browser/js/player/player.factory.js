'use strict';

juke.factory('PlayerFactory', function($rootScope){
  // non-UI logic in here
  var factoryObj = {};
  var currentSong = null;
  var playing = false;
  var progress = 0;
  var currentAlbum = null;

  var audio = document.createElement('audio');
  audio.addEventListener('ended', function () {
    this.next();
    // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
    $rootScope.$evalAsync(); // likely best, schedules digest if none happening
  });
  audio.addEventListener('timeupdate', function () {
    progress = 100 * audio.currentTime / audio.duration;
    // $scope.$digest(); // re-computes current template only (this scope)
    $rootScope.$evalAsync(); // likely best, schedules digest if none happening
  });

  factoryObj.setCurrentAlbum = function(album) {
  	currentAlbum = album;
  }

  factoryObj.start = function(song){
  	this.pause();
    playing = true;
    // resume current song
    if (song === currentSong) return audio.play();
    // enable loading new song
    currentSong = song;
    audio.src = song.audioUrl;
    audio.load();
    audio.play();
  };

  factoryObj.pause = function(){
  	audio.pause();
  	playing = false;
  };

  factoryObj.resume = function(){
  	audio.play();
  	playing = true;
  };

  factoryObj.isPlaying = function(){
  	return playing;
  };

  factoryObj.getCurrentSong = function(){
  	return currentSong;
  };

  factoryObj.next = function(){
  	this.pause();
  	skip(1);
  	
  };

  factoryObj.previous = function(){
  	this.pause();
  	skip(-1);

  };

  factoryObj.getProgress = function(){
  	return progress/100;
  };

  factoryObj.seek = function(evt) {
  	var decimal = evt.offsetX / evt.currentTarget.scrollWidth;
  	audio.currentTime = audio.duration * decimal;
  }

  factoryObj.toggle = function(song) {
  	if (playing) {
  	  if (song === currentSong){
  	    this.pause();
  	  } else {
  	    this.start(song);
  	  }
  	}
  	else if (!playing) {
  	  if (song === currentSong){
  	    this.resume();
  	  } else {
  	    this.start(song);
  	  }
  	}
  };

  function skip (interval) {
    if (!currentSong) return;
    var index = currentSong.albumIndex;
    index = mod( (index + (interval || 1)), currentAlbum.songs.length );
    factoryObj.start(currentAlbum.songs[index]);
  }

  function mod (num, m) { return ((num % m) + m) % m; }


  return factoryObj;
});
