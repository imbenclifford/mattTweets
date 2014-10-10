var Twit = require('twit');
var fs = require('fs');
var credentials = require('./credentials');

var T = new Twit({
   consumer_key: credentials.consumer_key,
   consumer_secret: credentials.consumer_secret, 
   access_token: credentials.access_token,
   access_token_secret: credentials.access_token_secret
});

var mongo = require('mongodb');

module.exports = function () {

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
  
    mongo.MongoClient.connect(process.env.MONGOURL, function(err, database){
  var collection = database.collection("scubadog")
  collection.insert({
    name: "Bill",
    age: 23,
    haircolor: "blondey"
  }, function(err, data){
    })
  
})
  
  });
};