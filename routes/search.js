var express = require('express');
var router = module.exports =  express.Router();
var server = require('../server');
var relate = require('../handlers/queryHandler');
var rank = require('../handlers/resultRanker');
var Canvas = require('canvas');
var cloud = require('d3-cloud');

var searchEngine = require('../metadataFixer');
var words=[];


router.get('/words', function(req, res, next){
  var searchQuery = req.query.searchQuery.toLowerCase().trim();
  var machineLearning = req.query.machineLearning;
  var language = req.query.language;
  server.notify('searchquery', ''+searchQuery);
  server.notify('machinelearning', ''+machineLearning);
  var words = [];
  words[0] = {'word': searchQuery, 'prob': 2.00};
  var searchWord = {'word': searchQuery, 'prob': 2.00};
  if(machineLearning == 'true'){
    //Send to ML-interface
    var lang = (language=='true')? 'eng' : 'nor';
    relate.findRelatedWords(searchQuery, lang, function(result){
      result[result.length]=searchWord; //Regular JSON array used to construct word cloud
      //result[1][searchWord.word]=searchWord;  //Hashmap of words containing a JSON object used for search and sorting etc.
      //console.log('2d',result[1]);
      res.send(result);
    });
  }else{
    res.send(words);
  }
});

router.get('/', function(req, res, next){
  var result;
  var machineLearning = 'true';
  var words = JSON.parse(req.query.words);
  console.log('searchjs',words);
  var search_string='';
  var help = 0;

  for(i in words){
    if(help < words.length-1){
      search_string += words[i].word + '%20or%20';
    }else{
      search_string += words[i].word;
    }
    help++;
  }
  console.log(search_string);
  //Hent fra Database
  // for (var word in words) {
  //   if (object.hasOwnProperty(word)) {
  //   }
  // }


  if(machineLearning == 'true'){
    server.notify('true?', 'ja');
  //  result =
  //   [
  //   {src: 'http://www.101dogbreeds.com/wp-content/uploads/2015/01/Nova-Scotia-Duck-Tolling-Retriever-Black-Nose.jpg', alt: 'metadataDog'},
  //   {src: 'http://platowebdesign.com/articles/wp-content/uploads/2014/10/public-domain-images-free-stock-photos-light-sky-silo-windows-lillyphotographer-1024x684.jpg', alt: 'sylinder'},
  //   {src: 'https://www.colourbox.com/preview/2867364-a-background-of-wood-stock.jpg', alt: 'logs'},
  //   {src: 'https://upload.wikimedia.org/wikipedia/commons/0/05/C_Stock_at_Ladbroke_Grove_1.jpg', alt: 'train'},
  //   {src: 'http://stockfresh.com/files/k/kamchatka/m/46/744446_stock-photo-river-on-sunset.jpg', alt: 'river sunset'},
  //   {src: 'https://www.ethos3.com/wp-content/uploads/2014/11/stock-photo-600x405.jpg', alt: 'flying fish'},
  //   {src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/This_is_Anfield.jpg/220px-This_is_Anfield.jpg', alt: 'YNWA'},
  //   {src: 'http://www.freewallpaperfullhd.com/wp-content/uploads/2015/03/wallpapers/two_swans-wallpaper-3840x2160.jpg', alt: 'Swans can be gay'}
  // ];
  searchEngine.createFileList(function(hits){
    var test = hits;
    rank.rank(words, test, function(sorted){
      res.send(sorted);
    });
  });
  // function send(mes){
  //   res.send(mes)
  // }
  }else{
    server.notify('true?', 'nei');
    result = [{src: 'http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Birds/H-P/mallard-male-standing.jpg.adapt.945.1.jpg', alt: 'metadataDuck'}];
    res.send(result);
  }
});
