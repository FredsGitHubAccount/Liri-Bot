
// Global Variables
require("dotenv").config();
let keys = require('./keys')
let Spotify = require('node-spotify-api');
let request = require('request');
let fs = require('fs')

let spotify = new Spotify(keys.spotify);
// let client = new Twitter(keys.twitter);

// Storing
let userRequest = process.argv[2]
let userRequestInfo = process.argv.slice(3).join(" ")

// Spotify Segment
function callSpotify(song){ 
console.log(song)
    
 
spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

let songInfo = data.tracks.items
for(let i = 0; i<songInfo.length;i++){
    console.log(`The Artist is ${songInfo[i].artists[0].name}`)
    console.log(`The Song is titled ${songInfo[i].name}`)
    console.log(`The link to preview is ${songInfo[i].external_urls.spotify}`)
    console.log(`The Album is ${songInfo[i].album.name}`)
}

// console.log(JSON.stringify(data.tracks.items[0].artists[0].name,null,2))
});
}


function callOmdb() {
  console.log(userRequestInfo)
    userRequestInfo=process.argv.slice(3).join("+")

    if(userRequestInfo==""){
        userRequestInfo="Mr.Nobody"
    }

    console.log(userRequestInfo)
    request(`http://www.omdbapi.com/?t=${userRequestInfo}&y=&plot=short&apikey=trilogy`, function (err,data) {
        if (err) {
            return console.log('Error occurred: ' + err);
          }
         
          let parsedData = JSON.parse(data.body)
        //   console.log(parsedData)
          console.log(`Movie Title : ${(parsedData.Title)} `)
          console.log(`Year Released : ${parsedData.Released}`)
          console.log(`IMDB Rating : ${parsedData.imdbRating} `)
          console.log(`Rotten Tomatoes Rating : ${parsedData.Ratings[1].Value} `)
          console.log(`The movie was produced in ${parsedData.Country}`)
          console.log(`The language of the movie is in ${parsedData.Language} `)
          console.log(`Plot : ${parsedData.Plot}`)
          console.log(`Actors : ${parsedData.Actors}`)
  

});

}

function doWhatItSays() {
    fs.readFile("random.txt","utf8",function(err,data){
        let datasplit = data.split(",")
        callSpotify(datasplit[1])
    })
}


// arguments

if(userRequest==="spotify-this-song"){
    if(userRequestInfo){
        callSpotify(userRequestInfo);
     } else{
        callSpotify("The Sign Ace of Base");
     }
} else if (userRequest ==="movie-this"){
    callOmdb()
} else if(userRequest ==="do-what-it-says"){
    doWhatItSays()
}
