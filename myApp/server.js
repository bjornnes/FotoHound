'use strict';

const PORT=8080;

var fs = require('fs');
var https = require('https');
var http=require('http');
var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./router.js');

var hskey = fs.readFileSync(__dirname+'/sslcert/server.key');
var hscert = fs.readFileSync(__dirname+'/sslcert/server.cert');

//var mysql = require('promise-mysql');
//var connection = require("express-myconnection");

var app = express();
var credentials = {
    key: hskey,
    cert: hscert,
    passphrase: '1234'
};

var DataHandler = require( './handlers/DataHandler.js');


app.use(bodyParser.json());

var handlers = {
  data : new DataHandler()
};

routes.setup(app,handlers);

//app.use(express.static(__dirname + "/../client"));
var httpServer=http.createServer(app);
httpServer.listen(8080);
//var https_server = https.createServer(credentials, app);

// app.use(bodyParser.urlencoded({ extended: true }));
// //app.all('/oauth/token', app.oauth.grant());
//
// app.get('/*', function (req, res) {
//  /*if (req.session.access_token == null)
//  {
//      res.send("access token is null");
//  }
//  // Using the access token asks the IDM for the user info
//  oa.get(url, req.session.access_token, function (e, response)
//  {
//      var user = JSON.parse(response);
//      res.send("Welcome " + user.displayName + "<br> Your email address is " + user.email + "<br><br><button onclick='window.location.href=\"/logout\"'>Log out</button>");
//  });
//   res.send('Secret area');*/
//   //res.json({test: 'successful'});
//   res.sendFile(__dirname+'/html/search.html')
//   console.log('connection');
// });
//
// app.post('/*', function(req, res){
//   console.log('searching');
//   var searchWord = req.body.search_field;
//   console.log(searchWord);
// });
//
// var server=https_server.listen(PORT, () => {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log('Example app listening at https://localhost:%s', port);
// });
