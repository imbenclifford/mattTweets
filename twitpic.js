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

  T.get('search/tweets', { q: '#CollectiveAcademy' }, function(err, data, response) {
    var mango = data.statuses;

       mango.forEach(function(tweet){
           if (tweet.entities.media && (tweet.entities.media[0].type)==="photo"){
            var pic = tweet.entities.media[0].media_url;
            var stringPic = pic.toString();
            console.log(stringPic);
            var newPic = {
              imgUrl: stringPic
            }
            mongo.MongoClient.connect(process.env.MONGOURL || credentials.db, function(err, db){
              var collection = db.collection("twitpics")
              collection.insert(newPic, function(err, data){
                  if (err) console.log('Problem with posting a new entry');
              })
            })
           }
       });
    
  });
};