var rp = require('request-promise');

var serverIP = "http://158.38.43.70";

var paging_array = ['','&p=1','&p=2','&p=3','&p=4','&p=5','&p=6','&p=7'];

function fotowebConn(search_string, findPages, j, callback){

    var json_output = [];
    var options = {
        uri: 'http://158.38.43.70/fotoweb/archives/5000-reuters/?q=' + search_string + paging_array[j],//,
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
exports.fotowebSearch = fotowebSearch;

function fotowebSearch(searchWord,callback){
  var res = new Array();
  fotowebConn(searchWord, true, 0, function(hits){
    console.log(hits);
    var pages = (hits > 175)? 8 : Math.floor((hits/25)+1);
    //var pages = Math.floor((hits/25)+1);
    console.log(pages);
    for (var j = 0; j < pages; j++) {
          fotowebConn(searchWord, false, j, function(out){
          res.push(out);
          if(res.length == pages){
            var merged = [].concat.apply([], res);
            callback(merged);
          }
        });
    }
  });
}
