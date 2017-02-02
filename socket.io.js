var express = require('express'),
    io  = require('socket.io');
//var app = express.createServer('127.0.0.1');
console.log('started');
//app.listen(8080);
var socket = io.listen(8080);
socket.on('connection', function (client){
  var ID = (client.id).toString();
  // new client is here!
  console.log('new con: '+ID);

  client.send('I\'m '+ID);
  client.broadcast.send('I\'m here!');

  client.on('message', function (message) {
    console.log(message);
  }) ;

  client.on('disconnect', function () {
  });
});
