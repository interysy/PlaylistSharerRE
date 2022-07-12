const { google } = require('googleapis');

const result = require("dotenv").config({ path: "secrets.env" });


if (result.error) {
    throw result.error;
}

const BASELINK = "https://www.googleapis.com/youtube/v3";
const REDIRECT_URI = "http://localhost:3001/authenticateyoutube";

const oauth2client = new google.auth.OAuth2(
    getClientId(),
    getClientSecret(),
    REDIRECT_URI
);

function getOAuth2Client() {
    return oauth2client;
}

async function getAndSetToken(code) {
    console.log("HERE");
    let { tokens } = await oauth2client.getToken(code);
    console.log(tokens);
    oauth2client.setCredentials(tokens);
    return oauth2client.credentials.access_token;
}

function getYoutubeAuthenticationLink() {
    const scopes = [
        "https://www.googleapis.com/auth/youtube.readonly",
    ]

    return oauth2client.generateAuthUrl({
        access_type: "online",
        scope: scopes.join(' '),
        include_granted_scopes: true
    });
}

function getClientSecret() {
    return process.env.YOUTUBE_CLIENT_SECRET;
}

function getClientId() {
    return process.env.YOUTUBE_CLIENT_ID;

}


module.exports = {
    getYoutubeAuthenticationLink,
    getAndSetToken
}