

const callbackController = async (req, res) => {

 const code = req.query.code || null;
 const state = req.query.state || null;


 app.get('/callback', function(req, res) {

    if (state === null) {
        return res.redirect('/#' + querystring.stringify({ error: 'state_mismatch' }));
    }

     const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: envConfig.spotifyRedirect,
          grant_type: 'authorization_code'
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' +
            Buffer.from(envConfig.spotifyClientId + 
            ':' + 
            envConfig.spotifyClientSecret).toString('base64')
        },
        json: true
      };



 })

}







    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

