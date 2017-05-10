var rp = require('request-promise');

var serverIP = "http://158.38.43.70";

var paging = '';

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

// function testFotoweb(callback){
//   fotowebConnection('',false,callback(res){
//
//   });
// }
function fotowebSearch(search_string, callback){
  var options = {
      uri: 'http://158.38.43.70/fotoweb/archives/5000-reuters/?120=soccer' ,//+ search_string,
      json: true // Automatically parses the JSON string in the response
  };
  rp(options)
      .then(function (repos) {
        var json_res = JSON.stringify(repos);
        var res = JSON.parse(json_res);
        var metadata = res.assets.data;
        var json_output = [];
        var json_res;
        var parsed_res;

        // this.paging = res.assets.paging;
        // //console.log(paging);
        // //console.log(paging);
        // fotowebConnection(this.paging.next,true, function(res){
        //   json_res = JSON.stringify(res);
        //   parsed_res = JSON.parse(json_res);
        //   //console.log(parsed_res.assets.paging);
        //   console.log(parsed_res.assets.paging);
        //   this.paging = parsed_res.assets.paging;
        //   if(this.paging.next != ''){
        //
        //   }
        // });
        var testRes = '';
        pageNext(res.assets.paging, testRes, function(res){
          testRes = res;
          console.log('res',res);
        });

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

fotowebSearch('',false, function(){
 console.log('asd');
});


function pageNext(page, ress, callback){
  fotowebConnection(page.next,true, function(res){
    json_res = JSON.stringify(res);
    parsed_res = JSON.parse(json_res);
    ress += parsed_res.assets.data;
    if(parsed_res.assets.paging.next != ''){
      pageNext(parsed_res.assets.paging, null);
    }
  });
  try{
      callback(ress);
  }catch(e){

  }
}
