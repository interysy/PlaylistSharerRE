const { google } = require('googleapis');

const result = require("dotenv").config({ path: "secrets.env" });


if (result.error) {
    throw result.error;
}

const BASELINK = "https://www.googleapis.com/youtube/v3";
const REDIRECT_URI = "http://localhost:3000/authenticateyoutube";

const oauth2client = new google.auth.OAuth2(
    getClientId(),
    getClientSecret(),
    REDIRECT_URI
);

function getOAuth2Client() {
    return oauth2client;
}

async function getAndSetToken(code) {
    let { tokens } = await oauth2client.getToken(code);
    oauth2client.setCredentials(tokens);

    if (tokens.access_token) {
        return [true, access_token];
    } else {
        return [false, null];
    }
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
    getOAuth2Client,
    getAndSetToken
}