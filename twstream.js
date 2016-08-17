var fs = require('fs');
var util = require('util');
var twitter = require('ntwitter');
var http = require('http');
var server = http.createServer();
var config = require('./config.js');

var twit = new twitter({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token_key: config.access_token_key,
	access_token_secret: config.access_token_secret
});

var keyword = process.argv[2]; //第一引数
var option = {'track': keyword};

server.on('request', doRequest);
server.listen(3000);

function doRequest(request, response) {
    switch(request.url) {
    case '/':
        fs.readFile('./index.html', 'UTF-8',
            function (err, data) {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data);
                response.end();
            }
        );
        break;
    case '/css/style.css':
        fs.readFile('./css/style.css', 'UTF-8',
            function (err, data) {
                response.writeHead(200, {'Content-Type': 'text/css'});
                response.write(data);
                response.end();
            }
        );
        break;
    }
};
console.log(keyword+'を含むツイートを取得します。');

var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
	socket.on('msg', function(data) {
		io.sockets.emit('msg', data);
	});
});

twit.stream('statuses/filter', option, function(stream) {
	stream.on('data', function (data) {
		data.keyword = keyword;
		io.sockets.emit('msg', data);
		console.log(data);
	});
});
