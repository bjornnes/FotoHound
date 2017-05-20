var zerorpc = require("zerorpc");

var client = new zerorpc.Client();
client.connect("tcp://158.38.43.76:424");

function norwegianWord(pos, neg, callback){

  client.invoke("norwegianSocket", pos, neg, function(error, res, more) {
      callback(res);
      // client.close();
  });
}

function englishWord(pos, neg, callback){

  client.invoke("englishSocket", pos, neg, function(error, res, more) {
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
