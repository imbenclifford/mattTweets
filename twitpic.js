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
		
		var jsonTweets = JSON.stringify(ranTweets)
		fs.writeFile('array.json', jsonTweets, function (err) {
			if (err) throw err;
			console.log('It\'s saved!');
		});
		
 });
}