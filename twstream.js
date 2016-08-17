var util = require('util');
var twitter = require('ntwitter');
var config = require('./config.js');

var twit = new twitter({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token_key: config.access_token_key,
	access_token_secret: config.access_token_secret
});

var keyword = process.argv[2]; //第一引数
var option = {'track': keyword};

var fs = require('fs');
var app = require('http').createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(fs.readFileSync('index.html'));
}).listen(3000, 'localhost',function(){
	console.log(keyword+'を含むツイートを取得します。');
});

var io = require('socket.io').listen(app);
io.sockets.on('connection', function(socket) {
	socket.on('msg', function(data) {
		io.sockets.emit('msg', data);
	});
});

twit.stream('statuses/filter', option, function(stream) {
	stream.on('data', function (data) {
		io.sockets.emit('msg', data);
		console.log(data);
	});
});
