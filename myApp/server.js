'use strict';

const PORT=8080;

var fs = require('fs');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var pythonShell = require('python-shell');

var hskey = fs.readFileSync(__dirname+'/sslcert/server.key');
var hscert = fs.readFileSync(__dirname+'/sslcert/server.cert');

var app = module.exports = express();
var credentials = {
    key: hskey,
    cert: hscert,
    passphrase: '1234'
};

var pythonOptions = {
  mode: 'json',
  scriptPath: 'pythonScripts'
};

pythonShell.defaultOptions = pythonOptions;

var word2vec = new pythonShell('word2vec.py', pythonOptions);
//word2vec.send({command: 'most_similar', args: 'man'});
/*word2vec.receive('data', function(data){
  console.log('data: '+data);
});*/

app.use(express.static("client"));

var https_server = https.createServer(credentials, app);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

//app.all('/oauth/token', app.oauth.grant());

app.get('/*', function (req, res) {
 /*if (req.session.access_token == null)
 {
     res.send("access token is null");
 }
 // Using the access token asks the IDM for the user info
 oa.get(url, req.session.access_token, function (e, response)
 {
     var user = JSON.parse(response);
     res.send("Welcome " + user.displayName + "<br> Your email address is " + user.email + "<br><br><button onclick='window.location.href=\"/logout\"'>Log out</button>");
 });
  res.send('Secret area');*/
  //res.json({test: 'successful'});
  res.sendFile(__dirname+'/html/search.html');
  console.log('connection');
});

app.get('/search', function(req, res){
  console.log('searching');
  var searchWord = req.body.search_field;
  console.log(searchWord);
  console.log(req.body.results);
  res.sendFile(__dirname+'/html/search.html');
});

var server=https_server.listen(PORT, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at https://localhost:%s', port);
});
