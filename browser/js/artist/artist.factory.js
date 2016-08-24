juke.factory('ArtistFactory', function($http, SongFactory) {
  var artistobj = {};
  var currentArtist = null;
  artistobj.cache = {};

  artistobj.fetchAll = function(){
    return $http.get('/api/artists/')
      .then(function (res) { return res.data; })
  };

  artistobj.fetchById = function(id){
    var currentTime = Date.now();
    if (artistobj[id] && currentTime - artistobj[id][0] < 60000) {
      return artistobj[id][1];
    }

    return $http.get('/api/artists/' + id)
      .then(function (res) {return res.data;})
      .then(function(artist) {
        currentArtist = artist;
        return $http.get('/api/artists/' + id + '/albums')
      })
      .then(function (res) {return res.data;})
      .then(function(albums) {

        return currentArtist.albums = albums.map(function(album) {
          album.imageUrl = '/api/albums/' + album.id + '/image';
          album.songCount = album.songs.length;
          return album;
        })
      })
      .then(function() {
        return $http.get('/api/artists/' + currentArtist.id + '/songs')
      })
      .then(function (res) {return res.data;})
      
      .then(function(songs) {
        songs.forEach(function (song, i) {
          SongFactory.enhance(song, i);
        });
        currentArtist.songs = songs;
        artistobj[id] = [Date.now(), currentArtist];
        return currentArtist
      })
      
  };
  return artistobj;
})