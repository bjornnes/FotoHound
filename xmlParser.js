var DOMParser = require('xmldom').DOMParser;
var parser1 = require('xml2json');
var fs = require('fs'),
    xml2js = require('xml2js');

//var relate = require('./handlers/queryHandler');
var lang = 'eng';
var maps = {};
var words;
var description;

//relate.findRelatedWords('english', lang, function(res){
  //words = res;

var DOMParser = new DOMParser();

var doc = DOMParser.parseFromString("test.xmp", "application/xml");
  //console.log(doc);

  var parser = new xml2js.Parser();
  fs.readFile('test.xmp', function(err, data) {
    var doc = DOMParser.parseFromString(data.toString(), "application/xml");
          //parser.parseString(data, function (err, result) {
          // var raw_xmp = result.DocInfo.XMP;
          // var trim_xmp = trim(raw_xmp, '[ ');
          // var xmp = trim(trim_xmp, '] ');
          console.log(JSON.stringify(doc));


          //var description = result.newsMessage.itemSet[0].newsItem[0].contentMeta[0].description[0]._.toLowerCase();
          // maps['2017-04-28T133500Z_643870646_RC1E932D4950_RTRMADP_0_FRANCE-ELECTION-ZIDANE.XML'] = Number(1.5);
          // for( i in words){
          //   if(description.indexOf(words[i].word) > -1){
          //       var value = maps['2017-04-28T133500Z_643870646_RC1E932D4950_RTRMADP_0_FRANCE-ELECTION-ZIDANE.XML'];
          //       maps['2017-04-28T133500Z_643870646_RC1E932D4950_RTRMADP_0_FRANCE-ELECTION-ZIDANE.XML'] = Number(value + 1);
          //       //steg 1 lage score for hvert bilde
          //       // steg 2 map, filnavn som key og prob er value
          //     console.log(maps['2017-04-28T133500Z_643870646_RC1E932D4950_RTRMADP_0_FRANCE-ELECTION-ZIDANE.XML']);
          //   }
          // }
      //});
  });
