var DOMParser = require('xmldom').DOMParser;
//var xmlFile = require('./DocInfoFromIM_1.txt',)
var parser1 = require('xml2json');


var fs = require('fs'),
    xml2js = require('xml2js');
var xml = "<root>Hello xml2js!</root>";
var parser = new xml2js.Parser();
fs.readFile('2017-04-28T133500Z_643870646_RC1E932D4950_RTRMADP_0_FRANCE-ELECTION-ZIDANE.XML', function(err, data) {
    parser.parseString(data, function (err, result) {
      //var json = result.DocInfo.XMP;
        console.log(JSON.stringify(result.newsMessage.itemSet[0].newsItem[0].contentMeta[0].description[0]._));
        console.log('Done');
    });
});
//console.log("input -> %s", xml)

// xml to json
//var json = parser.toJson(test);
//console.log("to json -> %s", json);

// var doc = new DOMParser().parseFromString(test,'text/xml');
//     doc.documentElement.setAttribute('x','y');
//     doc.documentElement.setAttributeNS('./lite','c:x','y2');
//     var nsAttr = doc.documentElement.getAttributeNS('./lite','x')
    //console.info(nsAttr)
