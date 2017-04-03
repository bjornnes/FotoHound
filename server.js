'use strict';

const PORT=8080;

var fs = require('fs');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var pythonShell = require('python-shell');
var path = require('path');
var DataHandler = require('./handlers/DataHandler');

var hskey = fs.readFileSync('./sslcert/server.key');
var hscert = fs.readFileSync('./sslcert/server.cert');

//Set routes
var index = require('./routes/index');
var search = require('./routes/search');
var imageRest = require('./routes/imageRest');

//Initiate express
var app = module.exports = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set static folder
app.use(express.static(path.join(__dirname, 'client')));

//Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Set up data handler
var handlers = {
  dataHandler : new DataHandler()
};

//Https
var credentials = {
    key: hskey,
    cert: hscert,
    passphrase: '1234'
};

var https_server = https.createServer(credentials, app);


//Python interface
/*var pythonOptions = {
  mode: 'json',
  scriptPath: 'pythonScripts'
};

pythonShell.defaultOptions = pythonOptions;

var word2vec = new pythonShell('word2vec.py', pythonOptions);
//word2vec.send({command: 'most_similar', args: 'man'});
/*word2vec.receive('data', function(data){
  console.log('data: '+data);
});*/


//Set URL-routes
app.use('/', index);
app.use('/search', search);
//app.use('/data', imageRest);
imageRest.setup(app, handlers);

/*app.get('/*', function (req, res) {
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
  res.send('Secret area');
  //res.json({test: 'successful'});
  res.sendFile(__dirname+'/html/search.html');
  console.log('connection');
});*/

/*app.get('/search', function(req, res){
  console.log('searching');
  var searchWord = req.body.search_field;
  console.log(searchWord);
  console.log(req.body.results);
  res.sendFile(__dirname+'/html/search.html');
});*/

var server=https_server.listen(PORT, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at https://localhost:%s', port);
});
