// Create web server
// Start: node comments.js
// Open: http://localhost:8080

var http = require('http');
var fs = require('fs');
var url = require('url');

var comments = [];

var server = http.createServer(function(req, res) {
	var urlObj = url.parse(req.url, true);

	if (urlObj.pathname === '/') {
		fs.readFile('./index.html', function(err, data) {
			if (err) {
				res.end('404');
			} else {
				res.end(data);
			}
		});
	} else if (urlObj.pathname === '/getComments') {
		var callbackName = urlObj.query.callback;
		res.end(callbackName + '(' + JSON.stringify(comments) + ')');
	} else if (urlObj.pathname === '/submitComment') {
		comments.push(urlObj.query);
		res.end('success');
	} else {
		fs.readFile('.' + urlObj.pathname, function(err, data) {
			if (err) {
				res.end('404');
			} else {
				res.end(data);
			}
		});
	}
});

server.listen(8080, function() {
	console.log('server is running');
});