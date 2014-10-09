var http = require('http');
var twitpic = require('./twitpic')
var fs = require('fs')


twitpic();

var server = http.createServer(function (request, response) {
  response.writeHead(200, {
		"Content-Type": "text/plain",
		"Access-Control-Allow-Origin": "*"
	});
	
  var arrayJSON = fs.readFileSync('array.json', 'utf8', function (err, data) {
    if (err) throw err;
    return(data);
  });
  response.end(arrayJSON);
  
});
  
  var port = process.env.PORT || 3000;
	server.listen(port);





