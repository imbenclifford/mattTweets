var twitpic = require('./twitpic')
var fs = require('fs')
var http = require('http');

var server = http.createServer(function (request, response) {
  response.writeHead(200, {
    "Content-Type": "text/plain",
    "Access-Control-Allow-Origin": "*"
                          });
  twitpic();

  fs.readFile('array.json', 'utf8', function (err, data) {
    if (err) throw err;
    response.end(data);
  });
});

  
	server.listen(process.env.PORT || 3000);



