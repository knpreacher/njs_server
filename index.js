var wss = require('websocket').server;
var http = require('http');
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead('asdsdaadsasd');
    response.end();
    
});
server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});
ws = new wss({
    httpServer: server,
    autoAcceptConnections: false
});
ws.on('request',function(request){
   console.log(request.origin); 
    var connection = request.accept('echo-protocol', request.origin);
    connection.on('close',function(code,description){
            console.log('*************************');
    console.log(connection.remoteAddress);
    console.log('*************************');
    });
});
