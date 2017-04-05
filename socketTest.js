// var zerorpc = require("zerorpc");
//
// var client = new zerorpc.Client();
// client.connect("tcp://127.0.0.1:4242");
//
// client.invoke("hello", "World!", function(error, res, more) {
//     console.log(res);
// });
//
// var ws = new WebSocket("ws://localhost:9999/");
// ws.onopen = function() {
//   ws.send("Hello Mr. Server!");
// };
// ws.onmessage = function (e) { alert(e.data); };
// ws.onclose = function() { };

var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(9000);


io.sockets.on('connection', function (socket) {
  //Send welcome after connection is established
  socket.emit('welcome', { hello: 'world' });

  //Response question from client include client name
  socket.on('howareyou', function (data) {
    socket.emit('howareyou', { data: 'I\'m fine, thank' + data.name });
  });

  socket.on('disconnect', function () {
    console.log("Client is disconnected");
  });
});
