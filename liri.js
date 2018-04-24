var dotEnv = require("dotenv")
let keys = require('./keys.js');
// file system
var request = require("request");
var fs = require("fs");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var client = new twitter(keys.twitter);

let nodeArg = process.argv[3];
let command = process.argv[2];


switch(command){
    case "my-tweets":
      tweet();
    break;
    case "movie-this":
      if(nodeArg){
        movieThis(nodeArg);
      } else{
        movieThis("Mr. Nobody")
      }
    break;
    case "spotify-this-song":
    if(nodeArg) {
        spotify(nodeArg);
    } else {    
        spotify("The Sign");
    }
    break;
    case "do-what-it-says":
    doWhat();
}

function tweet(){
    //Display last 20 Tweets
    client.get('statuses/user_timeline.json?=twitterapi&danieltoshcount=5', function(error, tweets, response){
        if(!error) {
            for(var i = 0; i < tweets.length; i++) {
                var date = tweets[i].created_at;
                console.log(tweets[i].text + " Created At: " + tweets[i].created_at);
            }
        } else {
            console.log("Error occured.");
        }
    });
}

function spotify(song) {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: song}, function(error, data){
        if(!error) {
            for(var i = 0; i < data.tracks.items.length; i++){
                var songInfo = data.tracks.items[i];
                console.log("Artist: " + songInfo.artists[0].name);
                console.log("Song Name: " + songInfo.name);
                console.log("Preview Link: " + songInfo.preview_url);
                console.log("Album Name: " + songInfo.album.name);
              }
        } else {
            console.log("Spotify error occured.")
        }
    });
}

function movieThis(nodeArg) {
    request("http://www.omdbapi.com/?t=" + nodeArg + "&plot=short&apikey=trilogy", function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("The movie's title is: " + JSON.parse(body).Title);
            console.log("Movie release year: " + JSON.parse(body).Year);
            console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
            console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country produced: " + JSON.parse(body).Country);
            console.log("Movies Languages: " + JSON.parse(body).Language);
            console.log("Movies Plot: " + JSON.parse(body).Plot);
            console.log("Movies actors: " + JSON.parse(body).Actors);
        } else {
            console.log("An error occured with the OMDB response.")
        } 
    });
}

function doWhat() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        spotify(dataArr[1]);
    });
}
