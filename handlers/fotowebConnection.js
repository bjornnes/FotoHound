var rp = require('request-promise');

var serverIP = "http://158.38.43.70";

var paging_array = ['','&p=1','&p=2','&p=3','&p=4','&p=5','&p=6','&p=7'];

function fotowebConnection(string ,paging, callback){
  var url;

  if(paging){
    url = 'http://158.38.43.70' + string;
  }else{
    url = 'http://158.38.43.70/fotoweb/archives/5000-reuters/?120=soccer';
  }
  var options = {
      uri: url,
      json: true // Automatically parses the JSON string in the response
  };
  rp(options)
      .then(function (repos) {
        var json_res = JSON.stringify(repos);
        var res = JSON.parse(json_res);
        callback(res);
    })
    .catch(function (err) {
      console.log('fotoweb connection failed: ' + err);
        // API call failed...
    });
}

function fotowebConn(search_string, j, callback){

    var json_output = [];
    var options = {
        uri: 'http://158.38.43.70/fotoweb/archives/5000-reuters/?q=' + search_string + paging_array[j],//,
        json: true // Automatically parses the JSON string in the response
    };
  rp(options)
      .then(function (repos) {
        var json_res = JSON.stringify(repos);
        var res = JSON.parse(json_res);
        var metadata = res.assets.data;
        var json_res;
        var parsed_res;
        for(i in metadata){

          var meta = (metadata[i].metadata['120'].value);
          var prev_200 = (metadata[i].previews[9].href);
          var prev_1600 = (metadata[i].previews[2].href);
          var prev_2400 = (metadata[i].previews[3].href);

          json_output[i] = {desc : meta, small : serverIP+prev_200, medium : serverIP+prev_1600 , big : serverIP+prev_2400};
        }
        callback(json_output);
      })
      .catch(function (err) {
        console.log('Failed: ' + err);
          // API call failed...
      });
}
exports.fotowebSearch = fotowebSearch;

function fotowebSearch(searchWord,callback){
for (var j = 0; j < paging_array.length; j++) {
  var res = new Array();
      fotowebConn(searchWord,j, function(out){
      res.push(out);
      if(res.length == 8){
        var merged = [].concat.apply([], res);
        callback(merged);
      }
    });
}
}

fotowebSearch('soccer', function(array){
  console.log(array.length);
});
