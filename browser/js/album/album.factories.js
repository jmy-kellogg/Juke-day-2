juke.factory('AlbumFactory', function($http) {
  var albumobj = {};

  var currentAlbum = null;

  albumobj.getCurrentAlbum = function(){
    return currentAlbum;
  }

  albumobj.fetchAll = function(){
    return $http.get('/api/albums/')
      .then(function (res) { return res.data; })
      // .then(function(albums) {

      //   return albums.map(function(album) {
      //     album.imageUrl = '/api/albums/' + album.id + '/image';
      //     album.songCount = album.songs.length;
      //     album.songs.forEach(function (song, i) {
      //       song.audioUrl = '/api/songs/' + song.id + '/audio';
      //       song.albumIndex = i;
      //     });
      //     console.log(album)
      //     return album;
      //   })
      // });
  };

  albumobj.fetchById = function(id){
    return $http.get('/api/albums/' + id)
      .then(function (res) {return res.data;})
      .then(function(album) {
        album.imageUrl = '/api/albums/' + album.id + '/image';
        album.songCount = album.songs.length;
        album.songs.forEach(function (song, i) {
          song.audioUrl = '/api/songs/' + song.id + '/audio';
          song.albumIndex = i;
        });
        albumobj.currentAlbum = album;
        return album;
      });
  };
  return albumobj;
})



juke.factory('StatsFactory', function ($q) {
  var statsObj = {};
  statsObj.totalTime = function (album) {
    var audio = document.createElement('audio');
    return $q(function (resolve, reject) {
      var sum = 0;
      var n = 0;
      function resolveOrRecur () {
        if (n >= album.songs.length) resolve(sum);
        else audio.src = album.songs[n++].audioUrl;
      }
      audio.addEventListener('loadedmetadata', function () {
        sum += audio.duration;
        resolveOrRecur();
      });
      resolveOrRecur();
    });
  };
  return statsObj;
});