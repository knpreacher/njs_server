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
  var room = null;
  client.on('iwj',function (data) {
    console.log((new Date())+' : from: '+ID+' data: '+data);
    room = data;
    client.join(data);
    client.broadcast.to(data).send(ID + ' is connected to room')
  });
  client.on('rm',function(data){
    client.broadcast.to(room).emit('rm',data);
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
