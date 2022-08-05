import { getTracksFromPlaylistSpotify } from '../spotify/spotify_funcs'

const BASEYOUTUBEAPILINK = "https://youtube.googleapis.com/youtube/v3";

// GETTING ALL PLAYLISTS
export function getPlaylistsYoutube(token, apiKey) {
    let url = BASEYOUTUBEAPILINK + '/playlists?part=snippet%2CcontentDetails&maxResults=25&mine=true&key=' + apiKey;

    return (Promise.all([
        new Promise((resolve, reject) => {
            getData(url, [], resolve, reject, token);
        }),
    ]));
}


// GETTING PLAYLIST TRACKS - USED IN SPOTIFY FUNCS
export function getTracksFromPlaylistYoutube(token, api_key, playlist) {
    let url = BASEYOUTUBEAPILINK + '/playlistItems?part=snippet%2CcontentDetails%2Cid%2Cstatus&maxResults=50&playlistId=' + playlist + '&key=' + api_key;
    return (Promise.all([
        new Promise((resolve, reject) => {
            getData(url, [], resolve, reject, token);
        }),
    ]));
}

// GETTING DATA FROM API
function getData(url, data, resolve, reject, token) {
    fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then((response) => response.json()).then((response) => {
        let retrievedData = data.concat(response.items);
        if (response.nextPageToken) {
            getData(url + "&pageToken=" + response.nextPageToken, retrievedData, resolve, reject, token)
        } else {
            resolve(retrievedData)
        }
    }).catch(error => {
        reject(error)
    })
}


// MAINLOOP FOR TRANSFER  

export function transferToYoutube(playlists, spotifyToken, youtubeToken, youtubeApiKey) {
    createPlaylistsYoutube(playlists, youtubeToken, youtubeApiKey).then((createdPlaylists) => {
        getTracksToTransferToPlaylists(createdPlaylists[0], spotifyToken).then((createdPlaylistsWithTracks) => {
            console.log(Promise.all([
                new Promise((resolve, reject) => {
                    handlePlaylists(createdPlaylistsWithTracks[0], youtubeToken, youtubeApiKey, [], resolve, reject);
                }),
            ]));

        })
    })
}


// CREATING PLAYLISTS
function createPlaylistsYoutube(playlists, token, apiKey) {

    return (Promise.all([
        new Promise((resolve, reject) => {
            createPlaylistsYoutubeInner(playlists, [], resolve, reject, token, apiKey);
        }),
    ]));

}

function createPlaylistsYoutubeInner(playlists, data, resolve, reject, token, apiKey) {
    if (playlists.length > 0) {
        let currentPlaylist = playlists.shift();
        let currentPlaylistSplit = currentPlaylist.split("%");
        let currentPlaylistName = currentPlaylistSplit[0];
        let currentPlaylistId = currentPlaylistSplit[1];
        createPlaylistYoutube(token, apiKey, currentPlaylistName).then((response) => {
            data.push({
                name: currentPlaylistName,
                newId: response,
                oldId: currentPlaylistId
            });
            createPlaylistsYoutubeInner(playlists, data, resolve, reject, token, apiKey);
        }).catch((error) => {
            console.log(error)
        })

    } else {
        resolve(data);
    }
}

function createPlaylistYoutube(token, apiKey, title) {
    let description = 'Playlist shared from Spotify!';
    let url = BASEYOUTUBEAPILINK + '/playlists?part=snippet%2Cstatus&key=' + apiKey + 1;
    let options = {
        'method': 'POST',
        'body': JSON.stringify({
            'snippet': {
                'title': title,
                'description': description,
                'defaultLanguage': 'en',
            },
            "status": {
                "privacyStatus": "private"
            },
        }),
        'headers': {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    return fetch(url, options).then((response) => {
        return response.json()
    }).then((responseAsJson) => {
        return responseAsJson.id;
    }).catch((error) => {
        console.log(error);
    })

}

// GETTING TRACKS FROM SPOTIFY PER PLAYLIST
export function getTracksToTransferToPlaylists(playlists, spotifyToken) {
    return (Promise.all([
        new Promise((resolve, reject) => {
            getTracksToTransferToPlaylistsInner(playlists, [], resolve, reject, spotifyToken);
        }),
    ]));

}


export function getTracksToTransferToPlaylistsInner(playlists, data, resolve, reject, spotifyToken) {
    if (playlists.length > 0) {
        let currentPlaylist = playlists.shift();
        let currentPlaylistSpotifyId = currentPlaylist.oldId;
        getTracksFromPlaylistSpotify(spotifyToken, currentPlaylistSpotifyId).then((response) => {
            currentPlaylist.tracks = response
            data.push(currentPlaylist)
            return data
        }).then((data) => {
            getTracksToTransferToPlaylistsInner(playlists, data, resolve, reject, spotifyToken);
        }).catch((error) => {
            console.log(error);
        })

    } else {
        resolve(data);
    }
}


// GENERAL PLAYLIST HANDLING 
export function handlePlaylists(playlists, youtubeToken, youtubeApiKey, failed, resolve, reject) {
    if (playlists.length > 0) {
        let currentPlaylist = playlists.shift();
        let playlistId = currentPlaylist.newId;
        let tracks = currentPlaylist.tracks[0];
        let result = insertTracksIntoPlaylist(tracks, playlistId, youtubeToken, youtubeApiKey, []);
        if (typeof result === typeof []) {
            return result;
        } else {
            failed.concat(result);
        }
        handlePlaylists(playlists, youtubeToken, youtubeApiKey, failed, resolve, reject);
    } else {
        resolve(failed);
    }
}


// INSERTION 
export function insertTracksIntoPlaylist(tracks, playlistId, token, apiKey, failed) {
    if (tracks.length > 0) {
        let currentTrack = tracks.shift();
        let artist = currentTrack.track.artists[0].name
        let name = currentTrack.track.name

        searchForTrack(token, apiKey, artist, name).then((response) => {
            if (response[0].error) {
                throw response[0].error.message
            } else {
                let videoId = response[0].items[0].id.videoId;
                return videoId
            }
        }).then((videoId) => {
            setTimeout(() => {
                insertIntoPlaylist(token, apiKey, playlistId, videoId).then((response) => {
                    console.log(response);
                    if (response.error) {
                        failed.push(artist + " - " + name);
                    }
                    insertTracksIntoPlaylist(tracks, playlistId, token, apiKey, failed);
                })
            }, 500);
        }).catch((error) => {
            console.log(error)
            return error
        })

    } else {
        console.log(failed);
        return failed;
    }
}

export function insertIntoPlaylist(token, apiKey, playlist, video) {
    let url = BASEYOUTUBEAPILINK + '/playlistItems?part=id%2Csnippet&key=' + apiKey;

    return (Promise.all([
        new Promise((resolve, reject) => {
            insertIntoPlaylistInner(url, [], token, playlist, video, resolve, reject);
        }),
    ]));

}
export function insertIntoPlaylistInner(url, data, token, playlist, video, resolve, reject) {
    let options = {
        'method': 'POST',
        'body': JSON.stringify({
            "snippet": {
                "playlistId": playlist,
                "resourceId": {
                    "kind": "youtube#video",
                    "videoId": video,
                }
            }
        }),
        'headers': {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    return fetch(url, options).then((response) => {
        return response.json();
    }).then((responseAsJson) => {
        resolve(responseAsJson)
    }).catch((error) => {
        console.log(error)
    })

}


// SEARCHING
function searchForTrack(token, apiKey, artist, title) {
    let url = BASEYOUTUBEAPILINK + '/search?part=snippet&maxResults=1&q=' + artist.replace(" ", "%") + '%-%' + title.replace(" ", "%") + '&key=' + apiKey;
    return (Promise.all([
        new Promise((resolve, reject) => {
            searchForTrackInner(url, [], resolve, reject, token);
        }),
    ]));

}

export function searchForTrackInner(url, data, resolve, reject, token) {

    return fetch(url, {
        'headers': {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
        }
    }).then((response) => {
        return response = response.json();
    }).then((responseAsJson) => {
        data = responseAsJson
        resolve(data)
    }).catch((error) => {
        console.log(error);
    });
}