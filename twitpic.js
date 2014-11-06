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

  mongo.MongoClient.connect(process.env.MONGOURL, function(err, db){
      var collection = db.collection("tester")
      var newEntry = {
        name: "John",
        age: 14,
        haircolor: "yellowish"
      }
    collection.insert(newEntry, function(err, data){
        if (err) console.log('Problem with posting a new entry');
    });
  });

  var origArray = [];

  T.get('search/tweets', { q: '#CollectiveAcademy' }, function(err, data, response) {
    var mango = data.statuses;

       mango.forEach(function(tweet){
           if (tweet.entities.media && (tweet.entities.media[0].type)==="photo"){
            origArray.push(tweet.entities.media[0].media_url);
           }

           if (tweet=== mango[(mango.length-1)]){
             var jsonArray = JSON.stringify(origArray)
             fs.writeFile('array.json', jsonArray, function (err) {
                if (err) throw err;
                console.log('It\'s saved!');
                });
           }
       });
    
  });
};