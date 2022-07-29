const result = require("dotenv").config({ path: "secrets_backend.env" });
if (result.error) {
    throw result.error;
}


const AUTHORIZELINK = 'https://accounts.spotify.com/authorize?';
const REDIRECT_URI = `http://localhost:${process.env.PORT}/authenticatespotify`;
const BASELINK = "https://api.spotify.com/v1";


function getAuthorisationPageLink() {
    let state = generateRandomString(16);
    console.log(REDIRECT_URI);
    return [AUTHORIZELINK + new URLSearchParams({
        response_type: "code",
        client_id: getClientId(),
        state: state,
        scope: "playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private",
        redirect_uri: REDIRECT_URI,
    }), state];

}

function getClientId() {
    return process.env.SPOTIFY_CLIENT_ID;
}

function getClientSecret() {
    return process.env.SPOTIFY_CLIENT_SECRET;
}

function getTokenAuthenticationData(code) {
    let authentication_data = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(getClientId() + ':' + getClientSecret()).toString('base64'))
        },
        json: true
    }
    return authentication_data;
}


function generateRandomString(length) {
    let result = '';
    let allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (i = 0; i < length; i++) {
        result += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
    }
    return result;
}


module.exports = {
    getAuthorisationPageLink,
    getTokenAuthenticationData,
}