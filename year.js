/**
 * Created by reco on 2017/1/4.
 */

//http
var express = require('express');
var app = express();
var http = require('http').Server(app);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/remote', function(req, res){
    res.sendFile(__dirname + '/remote.html');
});

app.use(express.static(__dirname+'/public'));


//socket
var io = require('socket.io')(http);
io.on('connection', function(socket) {
    var client = false;
    var table = 0;
    console.log('a user connected');
    var max = 0;
    socket.on('disconnect', function (data) {

    });
    socket.on('set-client',function(data){
        console.log(data);
        client = data.client;
    });
    socket.on('set-table',function(data) {
        console.log(data);
        table = data['table'];
    });
    socket.on('on-data',function(data) {
        console.log(data);
        socket.broadcast.emit('on-data', data);
    });
});

http.listen(2017, function(){
    console.log('http listening on *:2017');
});