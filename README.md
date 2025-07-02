### Lisa Sulkes

### 💻 Program: Web Development Bachelor of Science

🆔 &nbsp; 0005306797

📪 &nbsp; LPSulkes@student.fullsail.edu

# Class: Project Portfolio III (WDV339)

# Term: C202507

<br>

## Project Overview:

This is a Spotify Web API application that allows users to search for artists, albums, and tracks. The app displays search results, and when a result is clicked, the user is redirected to the Spotify player. A user must have a Spotify account. If a user passes the JWT authorization, by having a JWT token, they will be taken to the search page right away , otherwise they will need to login to authorize thier spotify account.  

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

### Cd into the Spotify-app directory

<br>

## Install

    npm install

<br>

## Run the Application:

    npm start

<br>

## Stop the Application:

    Ctrl + C

<br>


## Links: 

### Sever:

- `PORT=3000`

  -  `http://localhost:3000/api/v1`

### API Users Endpoints
- `GET /api/users` - Get all users
- `GET /api/users:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users:id` - Update a user by ID
- `DELETE /api/users/:id` - Delete a user by ID

### API Spotify Endpoints

- `/artists`
- `/artists/id`
- `/artists/id/albums`
- `/artists/id/tracks`

- Artist
- Album
- Track

### MondoDB

- MONGODB_URI = mongodb://127.0.1/27017:Spotify-api_0725

### Database Fields:

- User Id
- Access Token
- Refresh Token
- JWT Token


### Client 

- `http://localhost:3000/login` 
- `http://localhost:3000/login/api/auth`
- `http://localhost:3000/` 



<br>



<br>
<br>

## Resources:

NodeJS:
`https://nodejs.org/en/download`

Express:
`https://expressjs.com/en/starter/installing.html`

MongoDB: `https://www.mongodb.com/docs/manual/introduction/`
