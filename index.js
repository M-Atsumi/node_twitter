var twitter = require('ntwitter');
var tw = new twitter({
  consumer_key: 'L9XpqQm284kHCHwRkfLKQ0Bbe',
  consumer_secret: 'l24p3ZFGU6xBX24Er62N3vvd087wj6QPY7Wh9myEUsXK8sHt6C',
  access_token_key: '3220888387-ZAob0CNewzAmbydSKJzGewyrbGUYedzU5PDUazK',
  access_token_secret: 'owcD88pU75dBNKXaRf08ioNDZ0TWZeRA2cDlmxuIVM1T1'
});

tw.stream('statuses/filter', {'track':'SMAP'}, function(stream) {
  stream.on('data', function (data) {
    console.log(data);
  });
});
