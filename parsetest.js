var saxpath = require('saxpath')
var fs = require('fs')
var sax = require('sax')
var parseString = require('xml2js').parseString;
var util = require('util');

var saxParser = sax.createStream(true)
var streamer = new saxpath.SaXPath(saxParser, '/DocInfo')

streamer.on('match', function(xml) {
    console.log(xml);
    parseString(xml, function (err, result) {
        var json1 = JSON.stringify(result);
        var json = JSON.parse(json1);
        console.log(util.inspect(json, false, null));
    });

});

fs.createReadStream('./DocInfoFromIM_1.txt').pipe(saxParser);
