'use strict';

const PORT=8080;

var fs = require('fs');
var https = require('https');
var http = require('http');

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var hskey = fs.readFileSync('./sslcert/server.key');
var hscert = fs.readFileSync('./sslcert/server.cert');

//Set routes
var index = require('./routes/index');
var search = require('./routes/search');

//Initiate express
var app = module.exports = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set static folder
app.use(express.static(path.join(__dirname, 'client')));        //Root folder for webpage
app.use(express.static(path.join(__dirname, 'images')));   //Folder for images

//Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Https
var credentials = {
    key: hskey,
    cert: hscert,
    passphrase: '1234'
};

//HTTPS-SERVER
var https_server = https.createServer(credentials, app);

//HTTPSERVER
//var httpServer= http.createServer(app);
//httpServer.listen(8080);

//Set URL-routes
app.use('/', index);
app.use('/search', search);

var server=https_server.listen(PORT, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at ',host, port);
});

// DEVELOPMENT
const notifier = require('node-notifier');

function notify(title, message){
  notifier.notify({
    'title': ''+title,
    'message': ''+message
  });
};

exports.notify = notify;
