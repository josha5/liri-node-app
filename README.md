# liri-node-app
a _Language_ Interpretation and Recognition Interface ## How to use.that takes in command line arguments to make calls to the 
Spotify API, OMDB API, & Twitter API.

## How to use.
This application takes one of 4 commands to call one of the APIS listed above. node liri.js [spotify-this-song] [your-song-here] will make a call to the spotify app and will output in the console: 

     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

The second command is node liri.js [movie-this] [your-movie-here] that makes a call to the OMDB API and outputs to the console:
  * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.

The third command is node liri.js [my-tweets] that outputs to the console my 20 latest tweets.
![my-tweets node command demo](https://media.giphy.com/media/3feY9ogg9fVAXoPM2c/giphy.gif)

the fourth command node liri.js [do-what-it-says] makes another call to the spotify api by reading the random.txt file to output song info to the console for that song.

