var socket = require('../service/clientSocket');

function findRelatedWords(pos, neg, language, callback){
  if (language == 'nor'){
    socket.norwegianWord(pos, neg, function(result){
      if(typeof result !== 'undefined' && result){
        var res = mapper(result);
        res = listLogic(res);
        callback(res);
      }else{
        callback();
      }
    });
  }else if(language == 'eng'){
    socket.englishWord(pos, neg, function(result){
      if(typeof result !== 'undefined' && result){
        var res = mapper(result);
        res = listLogic(res);
        callback(res);
      }else{
        callback();
      }
    });
  }
}

function mapper(result){
  console.log(result);
  var res = result.map(function(d){
    var dd = (''+d).split(',');
     return {word: dd[0].replace(/[^a-z0-9\'\`\-\—\'æøå\u00DE-\u017F]/g,''), prob: dd[1]};//, orig: dd[0]};

  });
  return res.filter(word => word.word != ''); //To remove the possibility of a hit only consisting of an unwanted character that would have been removed on line 23, which lead to crash when searching
}

function listLogic(words){
  var map = [];
  //var words = wordss.filter
  for(i in words){
    temp = words[i].word;
    temp = temp.toString().trim();
    if(temp in map){
      var prob;
      prob = map[temp].prob + Number(words[i].prob);
      if(isNaN(prob)){ //To counter the absurd problem that if temp equals the string find, line 36 will return true even if the array (map) is empty.
        prob = Number(words[i].prob);
      }
      words[i].prob = prob;
      delete map[temp];
      map[temp] = words[i];
    }else{
      words[i].prob = Number(words[i].prob);
      map[temp] = words[i];
    }
  }

  var array_values = new Array();
  for (var key in map) {
    array_values.push(map[key]);
  }
  return array_values;
  //return map;
}

exports.findRelatedWords = findRelatedWords;
// findRelatedWords('soda', 'eng', function(res){
//   console.log(res);
// });
