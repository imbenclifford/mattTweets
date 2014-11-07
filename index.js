var twitpic = require('./twitpic');
var fs = require('fs');
var http = require('http');
var credentials = require('./credentials');
var mongo = require('mongodb');


var server = http.createServer(function (request, response) {
  response.writeHead(200, {
    "Content-Type": "text/plain",
    "Access-Control-Allow-Origin": "*"
    });
  twitpic();

  mongo.MongoClient.connect(process.env.MONGOURL || credentials.db, function(err, db){
              var collection = db.collection("twitpics")
              collection.find().toArray(function(err, data) {
                response.write(JSON.stringify(data));
              })
            })

});
	server.listen(process.env.PORT || 3000);



