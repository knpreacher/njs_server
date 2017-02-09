var express = require('express'),
    io  = require('socket.io');
var usersCount = {};
console.log('started');
//app.listen(8080);
var socket = io.listen(8080);
socket.on('connection', function (client) {
  console.log((new Date()) + 'new con: '+usersCount.mroom);
  client.emit('gon','');

  var mroom = null;
  var mlogin = null;

  client.on('checkMyData',function (data) {
    console.log(data);
    mroom = data.room;
    client.join(mroom);
    if(usersCount.mroom!=null) usersCount.mroom++;
      else usersCount.mroom=1;
    mlogin = data.login;
    var mes = {};
    mes.login = mlogin;
    mes.count = usersCount.mroom;
    client.broadcast.to(mroom).emit('newUserCon',mes);
    client.emit('welcome',usersCount.mroom);
    console.log(mes);
  });
  client.on('newMes',function (data) {
    console.log('new mes from: '+mroom+' : '+data);
    client.broadcast.to(mroom).emit('newMes',data);
  });
  client.on('disconnect',function () {
    var mes = {};
    mes.login = mlogin;
    mes.count = usersCount.mroom;
    client.broadcast.to(mroom).emit('closeCon',mes);
    usersCount.mroom--;
    console.log(mlogin + ' is disconnected '+mes);
  });
});
