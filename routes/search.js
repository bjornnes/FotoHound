var express = require('express');
var router = module.exports =  express.Router();
var server = require('../server');
var relate = require('../handlers/queryHandler');
var Canvas = require('canvas');
var cloud = require('d3-cloud');

var searchEngine = require('../handlers/imageHandler');
var words=[];


router.get('/words', function(req, res, next){
  var searchQuery = req.query.searchQuery.toLowerCase().trim();
  var machineLearning = req.query.machineLearning;
  var language = req.query.language;
  server.notify('searchquery', ''+searchQuery);
  server.notify('machinelearning', ''+machineLearning);
  // var words = [];
  // words[0] = {'word': searchQuery, 'prob': 2.00};
  var searchWord = {'word': searchQuery, 'prob': 2.00};
  var searchArray =  searchQuery.split(/[\s]+/);
  var pos = [];
  var neg = [];
  for (var i = 0; i < searchArray.length; i++) {
    if(searchArray[i].charAt(0) == '-'){
      neg[neg.length] = searchArray[i].replace('-','');
    }else{
      pos[pos.length] = searchArray[i];
    }
  }

  console.log('pos', pos);
  console.log('neg', neg);
  if(machineLearning == 'true'){
    //Send to ML-interface
    var lang = (language=='English')? 'eng' : 'nor';
    relate.findRelatedWords(pos, neg, lang, function(result){
      result[result.length]=searchWord; //Regular JSON array used to construct word cloud
      //result[1][searchWord.word]=searchWord;  //Hashmap of words containing a JSON object used for search and sorting etc.
      //console.log('2d',result[1]);
      res.send(result);
    });
  }else{
    res.send([searchWord]);
  }
});

router.get('/', function(req, res, next){
  var result;
  var machineLearning = 'true';
  var words = JSON.parse(req.query.words);
  console.log('searchjs',words);
    searchEngine.search(words, machineLearning == 'true',function(hits){
      res.send(hits);
    });
});
