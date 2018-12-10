//Requiring all necessary node packages
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var axios = require('axios');
var fs = require('fs');
moment().format();

//User inputs are placed into a variable
var input = process.argv[2];

//A switch statement for each LIRI command
switch (input) {
    case "concert-this":
        concertThis();
        break;
    
    case "spotify-this-song":
        spotifySong();
        break;
    
    case "movie-this":
        movieThis();
        break;
    
    case "do-what-it-says":
        doWhatItSays();
        break;
};

//Creating the functions for each LIRI command

function concertThis() {
    var input = process.argv.slice(3).join(" ");
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
        function(hit) {
            console.log("These are" + input + "'s upcoming concerts!\n");
            for (var i = 0; i < hit.data.length; i++){
                console.log("Venue Name: " +hit.data[i].venue.name + "\n" +
                "Venue Location: " +hit.data[i].venue.city + ", " +hit.data[i].venue.country);

                var date = moment(hit.data[i].datetime);
                var convertDate = date.utc().format("MM-DD-YYYY");
                console.log("The event is occuring on " + convertDate + "\n");
            }
        }
    )
};