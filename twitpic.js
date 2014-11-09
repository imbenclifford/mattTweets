var Twit = require('twit');
var fs = require('fs');
var credentials = require('./credentials');
var mongo = require('mongodb');

var T = new Twit({
   consumer_key: credentials.consumer_key,
   consumer_secret: credentials.consumer_secret, 
   access_token: credentials.access_token,
   access_token_secret: credentials.access_token_secret
});

module.exports = function () {

  var origArray = [];

	T.get('statuses/user_timeline', { screen_name: 'matthewclifford', count: 100 }, function(err, data, response) {
    var tweets = data
		var ranTweets = [];
		for (var i=0; i<4; i++){
			var ranNumb = Math.round(Math.random() * 100);
			ranTweets[i] = tweets[ranNumb].text
		};

       ranTweets.forEach(function(tweet){
           mongo.MongoClient.connect(process.env.MONGOURL || credentials.db, function(err, db){
              var collection = db.collection(credentials.collection)
							collection.insert({tweet: tweet}, function(err, data){
                  if (err) console.log('Problem with posting a new entry');
              })
            })
  		});
 });
}