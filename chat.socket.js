var express = require('express'),
    io  = require('socket.io');
    //mysql = require('mysql');
//var _ = require('underscore');
var usersCount = {};
console.log('started');
//app.listen(8080);
var socket = io.listen(8080);
/*
var mysql_client = mysql.createConnection({
  host : 'localhost',
  user : 'knp',
  password : 'looklook',
  database : 'socket_chat',
});
mysql_client.query("SELECT * FROM users where login='knp'",function (error,result) {
  console.log(error);
  console.log(result);
  /*
  _.each(result,function (user) {
    console.log(user.id + ' ' + user.login);
  });
  */
});

socket.on('connection', function (client) {
  console.log((new Date()) + 'new con: '+usersCount.mroom);
  client.emit('gon','');

  var mroom = null;
  var mlogin = null;

  client.on('checkMyData',function (data) {
    console.log(data);
    //-------Checking password--------------------

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
        client.on('typing', function (data) {
          client.broadcast.to(data.room).emit('typing',data);
        });
        client.on('stop typing',function (data) {
          client.broadcast.to(data.room).emit('stop typing',data);
        });
        console.log(mes);

    //--------------------------------------------

  });

});
