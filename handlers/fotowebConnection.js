var http = require('http');
var rp = require('request-promise');

function fotowebSearch(search_string){
  var options = {
      uri: 'http://158.38.43.70/fotoweb/archives/5000-reuters/?q=' + search_string,
      json: true // Automatically parses the JSON string in the response
  };
  rp(options)
      .then(function (repos) {
        var json_res = JSON.stringify(repos);
        var res = JSON.parse(json_res);
        var metadata = res.assets.data;
        var json_output = [];

        for(i in metadata){

          var meta = (metadata[i].metadata['120'].value);
          var prev_200 = (metadata[i].previews[9].href);
          var prev_1600 = (metadata[i].previews[2].href);
          var prev_2400 = (metadata[i].previews[3].href);

          json_output[i] = {desc : meta, small : prev_200, medium : prev_1600 , big : prev_2400};
        }
          console.log(json_output);



        //console.log('User has %d repos', repos.toString());
      })
      .catch(function (err) {
        console.log('Failed: ' + err);
          // API call failed...
      });
}

exports.fotowebSearch = fotowebSearch;
