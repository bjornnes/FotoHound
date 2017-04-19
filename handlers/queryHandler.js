var socket = require('../socketTest');

function findRelatedWords(word, callback){
  socket.word2vec(word, function(result){
    var res = result.map(function(d){
      var dd = (''+d).split(',');
      return {word: dd[0], prob: dd[1]};
    });
    callback(res);
  });
}

exports.findRelatedWords = findRelatedWords;
