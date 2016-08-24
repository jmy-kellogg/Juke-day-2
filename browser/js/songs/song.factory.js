juke.factory('SongFactory', function() {
  var songobj = {};


  songobj.enhance = function(song, i){
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      song.albumIndex = i;
  };
  return songobj;
})