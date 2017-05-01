var socket = require('../socketTest');
var Hashmap = require('hashmap');
var fs = require('fs'),
    xml2js = require('xml2js');

function findRelatedWords(word, language, callback){
  word.toLowerCase();
  if (language == 'nor'){
    socket.norwegianWord(word, function(result){
      var res = result.map(function(d){
        var dd = (''+d).split(',');
        return {word: dd[0], prob: dd[1]};
      });
      var res = listLogic(res);
      callback(res);
    });
  }else if(language == 'eng'){
    socket.englishWord(word, function(result){
      var res = result.map(function(d){
        var dd = (''+d).split(',');
        return {word: dd[0], prob: dd[1]};
      });
      var res = listLogic(res);
      callback(res);
    });
  }
}

function listLogic(words){
  //var map = Hashmap();
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

var words;
findRelatedWords('france', 'eng', function(res){
  words = res;
  var maps = {};
  var parser = new xml2js.Parser();
  fs.readFile('2017-04-28T133500Z_643870646_RC1E932D4950_RTRMADP_0_FRANCE-ELECTION-ZIDANE.XML', function(err, data) {
      parser.parseString(data, function (err, resultt) {
          var description = resultt.newsMessage.itemSet[0].newsItem[0].contentMeta[0].description[0]._.toLowerCase();
          //console.log(description);
          maps['2017-04-28T133500Z_643870646_RC1E932D4950_RTRMADP_0_FRANCE-ELECTION-ZIDANE.XML'] = Number(1.5);
          for( i in words){
            if(description.indexOf(words[i].word) > -1){
                var value = maps['2017-04-28T133500Z_643870646_RC1E932D4950_RTRMADP_0_FRANCE-ELECTION-ZIDANE.XML'];
                maps['2017-04-28T133500Z_643870646_RC1E932D4950_RTRMADP_0_FRANCE-ELECTION-ZIDANE.XML'] = Number(value + 1);
                //steg 1 lage score for hvert bilde
                // map, filnavn som key og prob er value
              //console.log(maps['2017-04-28T133500Z_643870646_RC1E932D4950_RTRMADP_0_FRANCE-ELECTION-ZIDANE.XML']);
            } else {
            //  console.log('Fail');
            }
          }
      });
    });
  //console.log(res);
});
