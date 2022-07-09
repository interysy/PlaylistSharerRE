const express = require('express');
const request = require('request');
const cors = require('cors');
const url = require('url')
const https = require('https');
const { google } = require('googleapis');
const { getAuthorisationPageLink, getTokenAuthenticationData } = require("./spotify_handler");
const { getYoutubeAuthenticationLink, getOAuth2Client, getAndSetToken } = require("./youtube_handler");


const app = express()
app.use(cors())

var current_state = null;

app.get('/loginspotify', function(req, res) {
    [link, state] = getAuthorisationPageLink();
    current_state = state;
    res.redirect(link);
})

app.get('/logingoogle', function(req, res) {
    let link = getYoutubeAuthenticationLink();
    console.log(link);
    res.redirect(link);

})


app.get('/authenticatespotify', function(req, res) {

    let code = req.query.code || null;
    let state = req.query.state || null;

    if (state === current_state) {
        let authentication_data = getTokenAuthenticationData(code);


        request.post(authentication_data, function(error, response, body) {
            var access_token = body.access_token
            console.log("Completed request");
            console.log(body);
            console.log(access_token);
        })
    }

})

app.get('/authenticateyoutube', function(req, res) {
    console.log("Redirected here...");
    let q = url.parse(req.url, true).query || null;

    if (q != null) {
        let code = q.code;
        let success = getAndSetToken(code);

        if (success) {
            console.log("Successful");
        }
    }



})


function makeAPostRequest(data) {
    var result = '';
    let req = https.request(data, res => {
        res.on('data', (chunk) => {
            result += chunk;
        });

        res.on('end', () => {
            console.log('No more data in response.');
            return result;
        });

        req.on('error', (e) => {
            console.log("Problem with request");
        })

        req.end();

    })

}

let port = process.env.PORT || 8888
console.log(`Listening on port ${port}. Go /logingoogle or /loginspotify to initiate authentication flow.`)
app.listen(port)