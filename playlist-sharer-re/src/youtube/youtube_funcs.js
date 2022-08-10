import { getTracksFromPlaylistSpotify, generateRandomString } from '../spotify/spotify_funcs'


const BASEYOUTUBEAPILINK = "https://youtube.googleapis.com/youtube/v3";
const YOUTUBECLIENTID = process.env.YOUTUBECLIENTID;
const REDIRECT_URI = `${process.env.SITELINK}/gettoken`;
const scopes = [
    "https://www.googleapis.com/auth/youtube.force-ssl",
]

export function initiateImplicitGrantFlow() {
    let state = generateRandomString(16);
    let url = "https://accounts.google.com/o/oauth2/v2/auth";
    let options = new URLSearchParams({
        client_id: YOUTUBECLIENTID,
        redirect_uri: REDIRECT_URI,
        response_type: "token",
        scope: scopes.join(" "),
        state: state,
    })
    return [url + "?" + options, state]
}


// GETTING ALL PLAYLISTS
export function getPlaylistsYoutube(token) {
    let url = BASEYOUTUBEAPILINK + "/playlists?part=snippet%2CcontentDetails&maxResults=25&mine=true";

    return (Promise.all([
        new Promise((resolve, reject) => {
            getData(url, [], resolve, reject, token);
        }),
    ]));
}


// GETTING PLAYLIST TRACKS - USED IN SPOTIFY FUNCS
export function getTracksFromPlaylistYoutube(token, playlist) {
    let url = BASEYOUTUBEAPILINK + "/playlistItems?part=snippet%2CcontentDetails%2Cid%2Cstatus&maxResults=50&playlistId=" + playlist;

    return (Promise.all([
        new Promise((resolve, reject) => {
            getData(url, [], resolve, reject, token);
        }),
    ]));

}

// GETTING DATA FROM YOUTUBE
function getData(url, data, resolve, reject, token) {
    fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then((response) => response.json()).then((response) => {
        let retrievedData = data.concat(response.items);
        console.log(response);
        if (response.nextPageToken) {
            getData(url + "&pageToken=" + response.nextPageToken, retrievedData, resolve, reject, token)
        } else if (response.error) {
            throw "Status: " + response.error.code + " || Message: " + response.error.message;
        } else {
            resolve(retrievedData)
        }
    }).catch((error) => {
        reject(error)
    })
}

// PLAYLIST TRANSFER TO YT MAINLOOP
export function transferToYoutube(playlists, spotifyToken, youtubeToken) {
    return new Promise((resolve, reject) => {
        createPlaylistsYoutube(playlists, youtubeToken).then((createdPlaylists) => {
            getTracksToTransferToPlaylists(createdPlaylists[0], spotifyToken, youtubeToken).then((createdPlaylistsWithTracks) => {
                resolve(Promise.all([
                    new Promise((resolve, reject) => {
                        handlePlaylists(createdPlaylistsWithTracks[0], youtubeToken, [], resolve, reject);
                    }),
                ]));
            }).catch((error) => {
                reject(error)
            })
        }).catch((error) => {
            reject(error);
        })
    })
}

// CREATING PLAYLISTS
function createPlaylistsYoutube(playlists, token) {

    return (Promise.all([
        new Promise((resolve, reject) => {
            createPlaylistsYoutubeInner(playlists, [], resolve, reject, token);
        }),
    ]));

}

function createPlaylistsYoutubeInner(playlists, data, resolve, reject, token) {
    if (playlists.length > 0) {
        let currentPlaylist = playlists.shift();
        let currentPlaylistSplit = currentPlaylist.split("%");
        let currentPlaylistName = currentPlaylistSplit[0];
        let currentPlaylistId = currentPlaylistSplit[1];
        createPlaylistYoutube(token, currentPlaylistName).then((response) => {
            if (typeof response === typeof {}) {
                throw "An error has occured while creating playlist, rolling back created ones.";
            } else {
                data.push({
                    name: currentPlaylistName,
                    newId: response,
                    oldId: currentPlaylistId
                });

                createPlaylistsYoutubeInner(playlists, data, resolve, reject, token);
            }
        }).catch((error) => {
            data.push(currentPlaylist)
            data.concat(playlists);
            deletePlaylistsYoutube(data, token);
            reject(error)
        })
    } else {
        resolve(data);
    }
}

function createPlaylistYoutube(token, title) {

    let description = 'Playlist shared from Spotify!';
    let url = BASEYOUTUBEAPILINK + '/playlists?part=snippet%2Cstatus';
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
        return error;
    });
}

// DELETING PLAYLISTS (IF ERROR ARRISES IN ANY OF THE TWO FIRST STEPS)  
function deletePlaylistsYoutube(playlists, token) {
    if (playlists.length > 0) {
        let currentPlaylist = playlists.shift();
        let currentPlaylistId = currentPlaylist.newId;
        deletePlaylistYoutube(currentPlaylistId, token).then(() => {
            deletePlaylistsYoutube(playlists, token);
        });
    } else {
        return "Completed rollback";
    }
}



function deletePlaylistYoutube(id, token) {
    let url = BASEYOUTUBEAPILINK + "/playlists?id=" + id;
    let options = {
        'method': 'DELETE',
        'headers': {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
        },
    }
    return fetch(url, options).then((response) => {
        return;
    });
}

// GETTING TRACKS FROM SPOTIFY PER PLAYLIST
function getTracksToTransferToPlaylists(playlists, spotifyToken, youtubeToken) {
    return (Promise.all([
        new Promise((resolve, reject) => {
            getTracksToTransferToPlaylistsInner(playlists, [], resolve, reject, spotifyToken, youtubeToken);
        }),
    ]));

}


function getTracksToTransferToPlaylistsInner(playlists, data, resolve, reject, spotifyToken, youtubeToken) {
    if (playlists.length > 0) {
        let currentPlaylist = playlists.shift();
        let currentPlaylistSpotifyId = currentPlaylist.oldId;
        getTracksFromPlaylistSpotify(spotifyToken, currentPlaylistSpotifyId).then((response) => {
            currentPlaylist.tracks = response
            data.push(currentPlaylist)
            return data
        }).then((data) => {
            getTracksToTransferToPlaylistsInner(playlists, data, resolve, reject, spotifyToken, youtubeToken);
        }).catch((error) => {
            data.push(currentPlaylist);
            data.concat(playlists);
            deletePlaylistsYoutube(data, youtubeToken);
            reject(error);
        })

    } else {
        resolve(data);
    }

}

// GENERAL PLAYLIST HANDLING 
function handlePlaylists(playlists, youtubeToken, failed, resolve, reject) {
    if (playlists.length > 0) {
        let currentPlaylist = playlists.shift();
        let playlistId = currentPlaylist.newId;
        let tracks = currentPlaylist.tracks[0];
        insertTracksIntoPlaylist(tracks, playlistId, youtubeToken, []).then((result) => {
            failed = failed.concat({ name: currentPlaylist.name, failed: result });
            handlePlaylists(playlists, youtubeToken, failed, resolve, reject);
        });
    } else {
        resolve(failed)
    }
}


// SEARCHING 
function searchForTrack(token, artist, title) {
    let url = BASEYOUTUBEAPILINK + '/search?part=snippet&maxResults=1&q=' + artist.replace(" ", "%") + '%-%' + title.replace(" ", "%");
    return (Promise.all([
        new Promise((resolve, reject) => {
            searchForTrackInner(url, [], resolve, reject, token);
        }),
    ]));

}

function searchForTrackInner(url, data, resolve, reject, token) {

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
        reject(error);
    });
}

// INSERTION  

function insertTracksIntoPlaylist(tracks, playlistId, token, failed) {
    return (Promise.all([
        new Promise((resolve, reject) => {
            insertTracksIntoPlaylistInner(tracks, playlistId, token, failed, resolve, reject);
        }),
    ]));
}

function insertTracksIntoPlaylistInner(tracks, playlistId, token, failed, resolve, reject) {
    if (tracks.length > 0) {
        let currentTrack = tracks.shift();
        let artist = currentTrack.track.artists[0].name
        let name = currentTrack.track.name

        searchForTrack(token, artist, name).then((response) => {
            if (response[0].error) {
                failed.push(artist + " - " + name);
            } else {
                let videoId = response[0].items[0].id.videoId;
                return videoId;
            }
        }).then((videoId) => {
            setTimeout(() => {
                insertIntoPlaylist(token, playlistId, videoId).then((response) => {
                    if (response[0].error) {
                        failed.push(artist + " - " + name);
                    }
                    insertTracksIntoPlaylistInner(tracks, playlistId, token, failed, resolve, reject);
                })
            }, 500);
        });

    } else {
        resolve(failed);
    }
}

function insertIntoPlaylist(token, playlist, video) {
    let url = BASEYOUTUBEAPILINK + '/playlistItems?part=id%2Csnippet';

    return (Promise.all([
        new Promise((resolve, reject) => {
            insertIntoPlaylistInner(url, [], token, playlist, video, resolve, reject);
        }),
    ]));

}

function insertIntoPlaylistInner(url, data, token, playlist, video, resolve, reject) {
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
        reject(error);
    })
}