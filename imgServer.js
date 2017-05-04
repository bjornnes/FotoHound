const PORT=8081;

var fs = require('fs');
//var https = require('https');
var http = require('http');

var express = require('express');
var path = require('path');
var DataHandler = require('./handlers/DataHandler');


var app = express();

app.use(express.static('images'));

app.get('/', function(req, res, next){
  var imgName = req.query.imgName;
  res.send('IMTestFolder');
});


var server = http.createServer(app);
server.listen(PORT);
