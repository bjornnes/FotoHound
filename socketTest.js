var zerorpc = require("zerorpc");
var routes = require('./routes/imageRest');
var relate = require('./handlers/queryHandler');



var client = new zerorpc.Client();
client.connect("tcp://158.38.43.76:4242");

function norwegianWord(input, callback){

  client.invoke("norwegianSocket", input, function(error, res, more) {
      callback(res);
      // client.close();
  });
}

function englishWord(input, callback){

  client.invoke("englishSocket", input, function(error, res, more) {
      callback(res);
      // client.close();
  });
}

exports.norwegianWord = norwegianWord;
exports.englishWord = englishWord;

// var app = require('express')()
//   , server = require('http').createServer(app)
//   , io = require('socket.io').listen(server);
//
// server.listen(9000);
//
//
// io.sockets.on('connection', function (socket) {
//   //Send welcome after connection is established
//   socket.emit('welcome', { hello: 'world' });
//
//   //Response question from client include client name
//   socket.on('howareyou', function (data) {
//     socket.emit('howareyou', { data: 'I\'m fine, thank' + data.name });
//   });
//
//   socket.on('disconnect', function () {
//     console.log("Client is disconnected");
//   });
// });
