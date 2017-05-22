var rp = require('request-promise');
var serverIP = "http://158.38.43.70";
function fotowebConn(search_string, findPages, j, callback){

    var json_output = [];
    var options = {
        uri: serverIP+'/fotoweb/archives/5000-reuters/?q=' + search_string + '&p=' + j,//,
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


exports.fotowebConn = fotowebConn;
