var express = require('express'),
    io  = require('socket.io');
console.log('started');
//app.listen(8080);
var socket = io.listen(8080);
socket.on('connection', function (client) {
  console.log((new Date()) + 'new con:');
  client.emit('gon','');

  client.on('checkMyData',function (data) {
    console.log(data);
    client.join(data.room);
    client.broadcast.to(data.room).emit('newUserCon',data.login);
    client.emit('welcome','');
  });
});
