var rp = require('request-promise');

var serverIP = "http://158.38.43.70";

var paging_array = ['','&p=1','&p=2','&p=3','&p=4','&p=5','&p=6','&p=7'];

function fotowebConn(search_string, findPages, j, callback){

    var json_output = [];
    var options = {
        uri: 'http://158.38.43.70/fotoweb/archives/5000-reuters/?q=' + search_string + '&p=' + j,//,
        json: true // Automatically parses the JSON string in the response
    };
  rp(options)
      .then(function (repos) {
        var json_res = JSON.stringify(repos);
        var res = JSON.parse(json_res);
        if(findPages){
          var metadata = res.assetCount;
          console.log(res.assetCount);
          callback(metadata);
        }else{
          var metadata = res.assets.data;
          for(i in metadata){

            var meta = (metadata[i].metadata['120'].value);
            var prev_200 = (metadata[i].previews[9].href);
            var prev_1600 = (metadata[i].previews[2].href);
            var prev_2400 = (metadata[i].previews[3].href);

            json_output[i] = {desc : meta, small : serverIP+prev_200, medium : serverIP+prev_1600 , big : serverIP+prev_2400};
            }
            callback(json_output);
        }
      })
      .catch(function (err) {
        console.log('Failed: ' + err);
          // API call failed...
      });
}

function fotowebSearch(searchString,callback){
  var res = new Array();
  fotowebConn(searchString, true, 0, function(hits){
    console.log('hits',hits);
    // var pages = (hits > 175)? 8 : Math.floor((hits/25)+1);
    var pagesTemp = Math.floor((hits/25)+1);
    var pages = (pagesTemp>100)? 100 : pagesTemp;
    console.log('pages',pages);
    for (var j = 0; j < pages; j++) {
          fotowebConn(searchString, false, j, function(out){
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
