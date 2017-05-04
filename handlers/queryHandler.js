var socket = require('../socketTest');

function findRelatedWords(word, language, callback){
  word.toLowerCase();
  if (language == 'nor'){
    socket.norwegianWord(word, function(result){
      var res = mapper(result);
      res = listLogic(res);
      callback(res);
    });
  }else if(language == 'eng'){
    socket.englishWord(word, function(result){
      var res = mapper(result);
      res = listLogic(res);
      callback(res);
    });
  }
}

function mapper(result){
  var res = result.map(function(d){
    var dd = (''+d).split(',');
     return {word: dd[0].replace(/[^a-z0-9\'\`\-\—\'æøå\u00DE-\u017F]/g,''), prob: dd[1]};//, orig: dd[0]};

  });
  return res;
}

function listLogic(words){
  //var map = Hashmap();
  var map = {};
  for(i in words){
    temp = words[i].word;
    temp = temp.toString().trim();
    if(temp in map){
      var prob;
      prob = map[temp].prob + Number(words[i].prob);
      words[i].prob = prob;
      delete map[temp];
      map[temp] = words[i];
    }else{
      words[i].prob = Number(words[i].prob);
      map[temp] = words[i];
    }
  }

  // var array_values = new Array();
  // for (var key in map) {
  //   array_values.push(map[key]);
  // }
  // return array_values;
  return map;
}

exports.findRelatedWords = findRelatedWords;
// findRelatedWords('soda', 'eng', function(res){
//   console.log(res);
// });
