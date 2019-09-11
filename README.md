# Liri-Bot (Language Interpretation & Recognition Interface)

## Table of Contents 

## Objective 

Created a bot that receives commands from the CLI and outputs the response in the console and log.txt file.  The user will be able to get information about a specific twitter account, song information within the Spotify library, upcoming concerts based on a specific artist, and movie information within the OMDB (Open Movie Database).

## Code Structure

The app was broken down into a few functions that will execute based on what the user typed into the CLI.  Each API call was stored in seperate functions so each segment of the application can be easily modified in an organized manner.  

### Technologies
Back-End
- [ ] Node.js
- [ ] NPM Packages
- [ ] Spotify API
- [ ] Twitter API

### Video Demo
[![Liri-Bot Demo](https://img.youtube.com/vi/wKsQK6p8SRY/0.jpg)](https://www.youtube.com/watch?v=wKsQK6p8SRY)

### Setup 
```
1. git clone https://github.com/FredsGitHubAccount/Liri-Bot.git
2. cd Liri-Bot in your terminal
3. npm install 
4A. node liri.js spotify-this-song '<song name here>'
4B. node liri.js movie-this '<movie name here>'
4C. node liri.js my-tweets 
4D. node liri.js do-what-it-says
4E. node liril.js concert-this '<artist name here>'
5. Review results in the log.txt file or console

```
### Requirements

- API keys from Spotify & Twitter