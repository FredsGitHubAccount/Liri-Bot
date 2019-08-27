
// Global Variables
require("dotenv").config();
let keys = require('./keys')
let Spotify = require('node-spotify-api');
let Twitter = require('twitter')
let request = require('request');
let fs = require('fs')

// Exported credentials
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

// Storing command line 
let userRequest = process.argv[2]
let userRequestInfo = process.argv.slice(3).join(" ")

// Twitter segment
function callTwitter() {
  var params = { screen_name: 'BarackObama' };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    let j = 0;
    if (!error) {

      console.log(`I don't use twitter so I displayed Barack Obama's last 20 tweets`)
      for (let i = 0; i < 20; i++) {

        j++
        console.log(`The tweet below was posted on ${tweets[i].created_at}`)
        console.log(`${j} ${tweets[i].text}`);


        let date = tweets[i].created_at

        let tweet = tweets[i].text
        fs.appendFile("log.txt", `${`\r`}The tweet below was posted on ${date}${'\r'}${tweet}${'\r'}`, function (err) {

        })
      }

    }
  });


}

// Spotify Segment
function callSpotify(song) {

  spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    let songInfo = data.tracks.items
    for (let i = 0; i < songInfo.length; i++) {

      console.log(`The Artist is ${songInfo[i].artists[0].name}`)
      console.log(`The Song is titled ${songInfo[i].name}`)
      console.log(`The link to preview is ${songInfo[i].external_urls.spotify}`)
      console.log(`The Album is ${songInfo[i].album.name}`)

      // storing variables for cleaner appendFile syntax
      let artist = songInfo[i].artists[0].name
      let songName = songInfo[i].name
      let link = songInfo[i].external_urls.spotify
      let album = songInfo[i].album.name

      fs.appendFile("log.txt", `${`\r`}Artist : ${artist}${`\r`}Song : ${songName}${`\r`}Link : ${link}${`\r`}Album : ${album}${`\r`}`, function (err) {
        if (err) console.log(err)

      })


    }

    // console.log(JSON.stringify(data.tracks.items[0].artists[0].name,null,2))
  });
}

// OMBD Segment
function callOmdb() {
  console.log(userRequestInfo)
  userRequestInfo = process.argv.slice(3).join("+")

  if (userRequestInfo == "") {
    userRequestInfo = "Mr.Nobody"
  }

  console.log(userRequestInfo)
  request(`http://www.omdbapi.com/?t=${userRequestInfo}&y=&plot=short&apikey=trilogy`, function (err, data) {
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

    let movieTitle = parsedData.Title
    let yearReleased = parsedData.Released
    let imdbRating = parsedData.imdbRating
    let tomatoesRating = parsedData.Ratings[1].Value
    let region = parsedData.Country
    let language = parsedData.Language
    let moviePlot = parsedData.Plot
    let actors = parsedData.Actors

    fs.appendFile("log.txt", `${`\r`}Movie Title : ${movieTitle}${`\r`}Year Released : ${yearReleased}${`\r`}IMDB Rating : ${imdbRating}${`\r`}Rotten Tomatoes Rating : ${tomatoesRating}${`\r`}Country Produced : ${region}${`\r`}Language : ${language}${`\r`}Plot : ${moviePlot}${`\r`}Actors : ${actors}${`\r`}`, function (err) {
      if (err) console.log(err)

    })


  });

}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    let datasplit = data.split(",")
    callSpotify(datasplit[1])
  })
}


// Commands to call liri & corresponding functions
if (userRequest === "spotify-this-song") {
  if (userRequestInfo) {
    callSpotify(userRequestInfo);
  } else {
    callSpotify("The Sign Ace of Base");
  }
} else if (userRequest === "movie-this") {
  callOmdb()
} else if (userRequest === "do-what-it-says") {
  doWhatItSays()
} else if (userRequest === "my-tweets") {
  callTwitter()
}
