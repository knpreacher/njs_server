var express = require('express'),
    io  = require('socket.io');
//var app = express.createServer('127.0.0.1');
console.log('started');
//app.listen(8080);
var socket = io.listen(8080);
var gclient = null;
socket.on('connection', function (client){
  var ID = (client.id).toString();
  // new client is here!
  gclient = client;
  console.log((new Date()) + 'new con: '+ID);

  client.send('I\'m '+ID);
  client.broadcast.send(ID+' is connected!');

  client.on('message', function (message) {
    console.log(message);
  }) ;
  client.on('cmid',function (data){
    console.log('catched cmid data:'+ data);
  });
  client.on('disconnect', function () {
    console.log(ID+' is disconnected');
  });
});
/*
socket.on('cmid',function(socket , data){
  console.log('catched cmid data:'+ data + ' from '+socket);
});
socket.on('image',function(image) {
  console.log('image...');
  gclient.broadcast.emit('image',image);
});
*/
