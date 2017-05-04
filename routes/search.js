var express = require('express');
var router = module.exports =  express.Router();
var server = require('../server');
var relate = require('../handlers/queryHandler');

var Canvas = require('canvas');
var cloud = require('d3-cloud');

var searchEngine = require('../metadataFixer');


router.get('/words', function(req, res, next){
  var searchQuery = req.query.searchQuery.toLowerCase();
  var machineLearning = req.query.machineLearning;
  var language = req.query.language;
  server.notify('searchquery', ''+searchQuery);
  server.notify('machinelearning', ''+machineLearning);
  var words;
  words[searchQuery] = [{'word': searchQuery, 'prob': 2.00}];
  if(machineLearning == 'true'){
    //Send to ML-interface
    var lang = (language=='true')? 'eng' : 'nor';
    relate.findRelatedWords(searchQuery, lang, function(result){
      words += result;
      console.log(words);
      res.send(words);
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
  for(i in words){
    console.log(words[i]);
    if(i<words.length-1){
      search_string += words[i].word + ' or ';
    }else{
      search_string += words[i].word;
    }
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
    res.send(hits);
  });
  }else{
    server.notify('true?', 'nei');
    result = [{src: 'http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Birds/H-P/mallard-male-standing.jpg.adapt.945.1.jpg', alt: 'metadataDuck'}];
    res.send(result);
  }
});
