var Twit = require('twit');
var fs = require('fs')

var T = new Twit({
   consumer_key: 'MS7aeU2RotLM7ikiIT6QlVi6K',
   consumer_secret: 'gkYIk08uufXLXTyMEfmKB0sX0A4mDe4BRcPNCX6vYIemVmcBjb', 
   access_token: '2813311471-tuLTn0j6mkTDK74H4BcRg3qh0xvEBIdGCpz3Zxc',
   access_token_secret: 'psxk2F9aBYhBwj479vwGQTTYGP1Any7ChrHJFOFzfJ2oq'
});

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
    });
};