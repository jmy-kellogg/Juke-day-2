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
    factoryObj.next();
    // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
    $rootScope.$evalAsync(); // likely best, schedules digest if none happening
  });
  audio.addEventListener('timeupdate', function () {
    progress = 100 * audio.currentTime / audio.duration;
    // $scope.$digest(); // re-computes current template only (this scope)
    $rootScope.$evalAsync(); // likely best, schedules digest if none happening
  });


  var audio2 = document.createElement('audio');
  audio2.addEventListener('ended', function () {
    factoryObj.next();
    // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
    $rootScope.$evalAsync(); // likely best, schedules digest if none happening
  });
  audio2.addEventListener('timeupdate', function () {
    progress = 100 * audio2.currentTime / audio2.duration;
    // $scope.$digest(); // re-computes current template only (this scope)
    $rootScope.$evalAsync(); // likely best, schedules digest if none happening
  });
  audio2.src = null;


  factoryObj.setCurrentAlbum = function(album) {
  	currentAlbum = album;
  }

  factoryObj.start = function(song){
    factoryObj.pause();
    playing = true;
    // resume current song
    if (song === currentSong) return audio.play();
    // enable loading new song
    currentSong = song;
    

    if (audio2.src === song.url) {
      audio = Object.assign({}, audio2);
      audio.play();
    } else {
      audio.src = song.audioUrl;
      audio.load();
      audio.play();
    }

    var index = currentSong.albumIndex;
    index = mod( (index + 1), currentAlbum.songs.length );
    var nextSong = currentAlbum.songs[index]
    audio2.src = nextSong.audioUrl;
    audio2.load();
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
  	factoryObj.pause();
  	skip(1);
  	
  };

  factoryObj.previous = function(){
  	factoryObj.pause();
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
  	    factoryObj.pause();
  	  } else {
  	    factoryObj.start(song);
  	  }
  	}
  	else if (!playing) {
  	  if (song === currentSong){
  	    factoryObj.resume();
  	  } else {
  	    factoryObj.start(song);
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
