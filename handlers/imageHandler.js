var paging_array = ['','&p=1','&p=2','&p=3','&p=4','&p=5','&p=6','&p=7'];

var fwConn = require('../service/fotowebConnection');

function fotowebSearch(searchString,callback){
  var res = new Array();
  fwConn.fotowebConn(searchString, true, 0, function(hits){
    console.log('hits',hits);
    // var pages = (hits > 175)? 8 : Math.floor((hits/25)+1);
    var pagesTemp = Math.floor((hits/25)+1);
    var pages = (pagesTemp>100)? 100 : pagesTemp;
    console.log('pages',pages);
    for (var j = 0; j < pages; j++) {
          fwConn.fotowebConn(searchString, false, j, function(out){
          res.push(out);
          if(res.length == pages){
            var merged = [].concat.apply([], res);
            callback(merged);
          }
        });
    }
  });
}

function search(searchWord, machineLearning, callback){
  var searchString='';
  var help = 0;
  for(i in searchWord){
    if(help < searchWord.length-1){
      searchString += searchWord[i].word + '%20or%20';
    }else{
      searchString += searchWord[i].word;
    }
    help++;
  }
  fotowebSearch(searchString, function(res){
    if(machineLearning){
      var ranked = rank(searchWord, res);
      callback(ranked);
    }else{
      callback(res);
    }
  });
}

function rank(words, unsorted){
  var hits = unsorted;
  for(var hit in hits){
    var score = 0;
    hits[hit].hits =  [];
    for(var word in words){
      if(hits[hit].desc.toLowerCase().indexOf(words[word].word)>-1){
        score += words[word].prob;
        hits[hit].hits[hits[hit].hits.length] = words[word].word;
      }
    }
    hits[hit].score=score;
  }


  hits.sort(function(a,b){
    return b.score - a.score;
  });
  return hits;
}
exports.search = search;
