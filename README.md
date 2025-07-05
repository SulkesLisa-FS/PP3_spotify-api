### Lisa Sulkes

### 💻 Program: Web Development Bachelor of Science

🆔 &nbsp; 0005306797

📪 &nbsp; LPSulkes@student.fullsail.edu

# Class: Project Portfolio III (WDV339)

# Term: C202507

<br>

## Project Overview:

This is a Spotify Web API application that allows users to search for artists, albums, and tracks. The app displays search results, and when a result is clicked, the user is redirected to the Spotify player. A user must have a Spotify account. If a user passes the JWT authorization, by having a JWT token, they will be taken to the search page right away; otherwise, they will need to log in to authorize their Spotify account with a new Token or Token refresh.

<br>

## Prerequisites:

- Nodejs v22.17.0 (or compatible)
- nodemon v3.1.10
- JavaScript ECMAScript 2022 (ES13)
- Express v5.1.0
- Mongoose v8.16.1
- Database: MongoDB v8.0
- Supported Browsers:
  - Google Chrome v125 or later
  - Mozilla Firefox v125 or later
  - Safari v18 or later
  - Microsoft Edge (Chromium-based)

<br>

# Getting Started:

🔸 Download zip file and open <br>

🔸 Make sure your MongoDB is up and running

🔸 Cd into the pp3_spotify-api directory <br>

🔸 Revert the .env.dist file into a .env file and add your values.

**Module One Note: Will set up localhost and MongoDB variables**

The .env file should look something like this

```
# localhost
PORT=3000

# MongoDB
MONGODB_URI = mongodb://127.0.0.1:27017/Spotify-api

# Spotify API
SPOTIFY_API_KEY=your_api_key
```

- Add your own Spotify API key

## Install

    npm install

## Run

    npm run dev

<br>

# Next:

🔸 Cd into the client directory <br>

## Install

    npm install

<br>

## Run the Application:

    npm start

<br>

## Stop the Applications:

    Ctrl + C

<br>

## Links:

### Server:

- `PORT=3000`

  - `http://localhost:3000/api/v1`

### API Spotify Placeholder Endpoints

- ` /api/spotify/search/artist/:query` - Search for artists
- ` /api/spotify/search/album/:query` - Search for albums
- ` /api/spotify/search/track/:query` - Search for tracks
- ` /api/spotify/artist/:id` - Get artist details
- ` /api/spotify/album/:id` - Get album details
- ` /api/spotify/track/:id` - Get track details

### Database Fields:

- User Id
- Access Token
- Expires Date

### Client

- `http://localhost:3001/users/login`
- `http://localhost:3001/users/login/api/auth`
- `http://localhost:3001/users`
- `http://localhost:3001/`

<br>
<br>

## Resources:

NodeJS:
`https://nodejs.org/en/download`

Express:
`https://expressjs.com/en/starter/installing.html`

MongoDB: `https://www.mongodb.com/docs/manual/introduction/`

Markdown Checkboxes VScode extension by Matt Bierner: `bierner.markdown-checkbox`
