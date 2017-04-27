var socket = require('../socketTest');

function findRelatedWords(word, language, callback){
  if (language == 'nor'){
    socket.norwegianWord(word, function(result){
      var res = result.map(function(d){
        var dd = (''+d).split(',');
        return {word: dd[0], prob: dd[1]};
      });
      callback(res);
    });
  }else if(language == 'eng'){
    socket.englishWord(word, function(result){
      var res = result.map(function(d){
        var dd = (''+d).split(',');
        return {word: dd[0], prob: dd[1]};
      });
      callback(res);
    });
  }
}

function listLogic(words){
  var map = {};
  for(i in words){
    temp = words[i].word;
    temp = temp.toString().trim();
    if(temp in map){
      var prob;
      prob = Number(map[temp].prob) + Number(words[i].prob);
      words[i].prob = prob;
      delete map[temp];
      map[temp] = words[i];
    }else{
      map[temp] = words[i];
    }
  }

  var array_values = new Array();
  for (var key in map) {
    array_values.push(map[key]);
  }
  return array_values;
}

exports.findRelatedWords = findRelatedWords;


findRelatedWords('hest', function(res){
  //console.log(res);
});
