const express = require('express');
const request = require('request');
const cors = require('cors');
const url = require('url')
const https = require('https');
const { google } = require('googleapis');
const { getAuthorisationPageLink, getTokenAuthenticationData } = require("./spotify_handler");
const { getYoutubeAuthenticationLink, getAndSetToken } = require("./youtube_handler");

var REDIRECT_TO_REACT = 'http://localhost:3000/gettoken'

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
    res.redirect(link);

})


app.get('/authenticatespotify', function(req, res) {
    console.log("LOL");
    let code = req.query.code || null;
    let state = req.query.state || null;
    console.log(req.query);

    if (state === current_state) {
        let authentication_data = getTokenAuthenticationData(code);


        request.post(authentication_data, function(error, response, body) {
            var access_token = body.access_token
            console.log(body);
            if (access_token) {
                res.redirect(REDIRECT_TO_REACT + '?success=' + true + "&type=spotify" + '&access_token=' + access_token);
            } else {
                res.redirect(REDIRECT_TO_REACT + '?success=' + false + "&type=spotify");
            }
        })
    } else {
        res.redirect(REDIRECT_TO_REACT + '?success=' + false + '&error=' + (req.query.error || null) + "&type=spotify");

    }

})

app.get('/authenticateyoutube', async function(req, res) {
    console.log("AUTH");
    let q = url.parse(req.url, true).query || null;

    if (q != null) {
        let code = q.code;
        let access_token = await getAndSetToken(code);
        console.log(access_token)

        if (access_token != '') {
            res.redirect(REDIRECT_TO_REACT + "?success=" + true + '&type=youtube' + '&access_token=' + access_token);
        } else {
            res.redirect(REDIRECT_TO_REACT + "?success=" + false + '&type=youtube');
        }


    }



})


let port = process.env.PORT || 8888
console.log(`Listening on port ${port}. Go /logingoogle or /loginspotify to initiate authentication flow.`)
app.listen(port)