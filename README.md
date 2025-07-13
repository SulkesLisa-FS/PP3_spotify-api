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

🔸 Cd into the server directory <br>

🔸 Revert the .env.dist file into a .env file and add your values and keys.

The .env file should look something like this

```
# Environment
NODE_ENV=development
ENV_DEV=http://localhost:3000/api/v1/


# Server Configuration
PORT=3000

# MongoDB - Development
MONGODB_DEV=mongodb://localhost:27017/spotify-app


```

<br>

🔸 **Cd into the server directory** <br>

## Install

    npm install

# Next:

## Run

    npm run dev

<br>

🔸 **Cd into the client directory** <br>

## Install

    npm install

# Next:

## Run

    npm run dev

<br>

## Stop the Applications:

    Ctrl + C

<br>

## Links:

### Local Development:

- **Server**: `http://localhost:3000/api/v1/`
- **client**: `http://localhost:3001/`
- **Database**: `mongodb://localhost:27017/spotify-app`

### Authentication Endpoints:

- `/api/v1/auth/login` - Spotify login
- `/api/v1/auth/callback` - Spotify OAuth callback
- `/api/v1/auth/logout` - User logout

### Planned API Endpoints:

- `/api/v1/spotify/search/artist/:query` - Search artists
- `/api/v1/spotify/search/album/:query` - Search albums
- `/api/v1/spotify/search/track/:query` - Search tracks

### Client Endpoints:

- `/login` - Login Page
- `/` - Root Search Page

### TEST Endpoints:

- Server:

* `http://localhost:3000/api/v1/auth/login`

- Client:

* `http://localhost:3001/login`
* `http://localhost:3001/`

<br>
<br>

## Resources:

NodeJS:
`https://nodejs.org/en/download`

Express:
`https://expressjs.com/en/starter/installing.html`

MongoDB: `https://www.mongodb.com/docs/manual/introduction/`

Markdown Checkboxes VScode extension by Matt Bierner: `bierner.markdown-checkbox`

Spotify for Developers: `https://developer.spotify.com/documentation/web-api`
