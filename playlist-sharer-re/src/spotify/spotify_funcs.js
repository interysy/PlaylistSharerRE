import { getTracksFromPlaylistYoutube } from '../youtube/youtube_funcs'


const BASESPOTIFYAPILINK = "https://api.spotify.com/v1";
const AUTHORIZELINK = 'https://accounts.spotify.com/authorize?';
const REDIRECT_URI = `https://playlistsharerre.netlify.app/gettoken`;
const CLIENTID = 'aa7e8d29948e4e2fb53937b11adb69ed'


export function getAuthorisationPageLinkImplicitGrant() {
    let state = generateRandomString(16);
    return [AUTHORIZELINK + new URLSearchParams({
        response_type: "token",
        client_id: CLIENTID,
        state: state,
        scope: "playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private",
        redirect_uri: REDIRECT_URI,
        show_dialog: true,
    }), state];
}

export function generateRandomString(length) {
    let result = '';
    let allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        result += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
    }
    return result;
}


// GET PLAYLISTS
export function getPlaylistsSpotify(token) {
    let url = BASESPOTIFYAPILINK + '/me/playlists?limit=50';

    return Promise.all([
        new Promise((resolve, reject) => {
            getData(url, [], token, resolve, reject);
        }),
    ])
}

// GET TRACKS - USED IN YOUTUBE FUNCS
export function getTracksFromPlaylistSpotify(token, playlist) {
    var url = BASESPOTIFYAPILINK + "/playlists/" + playlist + "/tracks?limit=50";

    return Promise.all([
        new Promise((resolve, reject) => {
            getData(url, [], token, resolve, reject);
        }),
    ])
}

// USED WITH ANY GET REQUEST
function getData(url, data, token, resolve, reject) {
    fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then((response) => {
        let responseAsJson = response.json();
        return responseAsJson;
    }).then((response) => {
        if (response.error != null) {
            throw 'Message : ' + response.error.message + ' || Status Code : ' + response.error.status
        } else {
            let retrievedData = data.concat(response.items);
            if (response.next !== null) {
                getData(response.next, retrievedData, token, resolve, reject)
            } else {
                resolve(retrievedData)
            }
        }
    }).catch(error => {
        reject(error)
    })
}


// TRANSFER TO SPOTIFY MAINLOOP 

export function transferToSpotify(playlists, spotifyToken, youtubeToken) {
    return new Promise((resolve, reject) => {
        createPlaylistsSpotify(playlists, spotifyToken).then((createdPlaylists) => {
            getTracksToTransferToPlaylists(createdPlaylists, youtubeToken).then((playlistsWithTracks) => {
                resolve(Promise.all([
                    new Promise((resolve, reject) => {
                        handlePlaylists(playlistsWithTracks[0], spotifyToken, [], resolve, reject);
                    }),
                ]));
            }).catch((error) => {
                reject(error);
            })
        }).catch((error) => {
            reject(error);
        })
    })
}


// CREATE PLAYLISTS - STEP 1 OF TRANSFER  
function createPlaylistsSpotify(playlists, spotifyToken) {
    let url = BASESPOTIFYAPILINK + '/me/playlists';
    return Promise.all([
        new Promise((resolve, reject) => {
            createPlaylistsSpotifyInner(url, playlists, spotifyToken, [], reject, resolve);
        }),
    ])
}

function createPlaylistSpotify(playlist, token, url) {
    let description = "Shared from PlaylistSharerRE";

    return Promise.all([
        new Promise((resolve, reject) => {
            let options = {
                'method': 'POST',
                'body': JSON.stringify({
                    "name": playlist,
                    "description": description,
                    public: "false",
                }),
                'headers': {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }
            }

            return fetch(url, options).then((response) => {
                return response.json()
            }).then((responseAsJson) => {
                if (responseAsJson.error) {
                    throw "Message : Couldn't create a playlist in spotify" + ' || Status Code : ' + responseAsJson.error.status;
                } else {
                    resolve(responseAsJson.id);
                }
            }).catch((error) => {
                reject(error);
            })
        }),
    ])

}

function createPlaylistsSpotifyInner(url, playlists, spotifyToken, data, reject, resolve) {
    if (playlists.length > 0) {
        let currentPlaylist = playlists.shift();
        currentPlaylist = currentPlaylist.split("%");
        let currentPlaylistName = currentPlaylist[0];
        let currentPLaylistId = currentPlaylist[1];
        createPlaylistSpotify(currentPlaylistName, spotifyToken, url).then((response) => {
            data.push({
                name: currentPlaylistName,
                oldId: currentPLaylistId,
                newId: response[0],
            });
            return data;
        }).then((data) => {
            createPlaylistsSpotifyInner(url, playlists, spotifyToken, data, reject, resolve);
        }).catch((error) => {
            // delete playlists - not supported in api
            reject(error)

        })

    } else {
        resolve(data);
    }

}

// GETTING TRACKS FROM SPOTIFY - STEP 2 
function getTracksToTransferToPlaylists(playlists, youtubeToken) {
    return (Promise.all([
        new Promise((resolve, reject) => {
            getTracksToTransferToPlaylistsInner(playlists, [], resolve, reject, youtubeToken);
        }),
    ]));

}


function getTracksToTransferToPlaylistsInner(playlists, data, resolve, reject, youtubeToken) {
    if (playlists[0].length > 0) {
        let currentPlaylist = playlists[0].shift();
        let currentPlaylistYoutubeId = currentPlaylist.oldId;
        getTracksFromPlaylistYoutube(youtubeToken, currentPlaylistYoutubeId).then((response) => {
            currentPlaylist.tracks = response
            data.push(currentPlaylist);
            return data
        }).then((data) => {
            getTracksToTransferToPlaylistsInner(playlists, data, resolve, reject, youtubeToken);
        }).catch((error) => {
            if (typeof error === typeof {}) {
                error = error.message;
            }
            reject(error)
        })

    } else {
        resolve(data);
    }
}

// PLAYLIST HANDLER - THIRD STEP
function handlePlaylists(playlists, spotifyToken, failed, resolve, reject) {
    if (playlists.length > 0) {
        let currentPlaylist = playlists.shift();
        let currentPlaylistSpotifyId = currentPlaylist.newId;
        let currentPlaylistTracksToAdd = currentPlaylist.tracks[0];
        insertTracksIntoPlaylist(currentPlaylistTracksToAdd, currentPlaylistSpotifyId, spotifyToken, [], [], resolve, reject).then((failedSongs) => {
            failed.push({ failedSongs: failedSongs, name: currentPlaylist.name });
            handlePlaylists(playlists, spotifyToken, failed, resolve, reject);
        });
    } else {
        resolve(failed);
    }
}

// SEARCHING FOR TRACKS - STEP 4

function searchForTracksSpotify(token, name, artist) {
    let url = (artist === null) ? BASESPOTIFYAPILINK + '/search?q=track:' + name + '&type=track&limit=1' : BASESPOTIFYAPILINK + '/search?q=track:' + name + '%20artist:' + artist + '&type=track&limit=1';

    return new Promise((resolve, reject) => {
        fetch(url, {
            headers: {
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json",
            }
        }).then((response) => {
            return response.json();
        }).then((responseAsJson) => {
            if (responseAsJson.tracks.items.length === 0) {
                throw "Couldn't find track"
            } else {
                resolve(responseAsJson.tracks.items[0].id);
            }
        }).catch((error) => {
            reject(error);
        })
    });

}




function insertTracksIntoPlaylist(tracks, playlistId, token, data, failed) {
    return Promise.all([
        new Promise((resolve, reject) => {
            insertTracksIntoPlaylistInner(tracks, playlistId, token, data, failed, resolve, reject);
        }),
    ])
}


function removeBracketsAndFeatures(currentTrackTitle) {
    let currentTrackNoBrackets = currentTrackTitle.indexOf("[");
    let currentTrackNoSquareBrackets = currentTrackTitle.indexOf("(");
    if (currentTrackNoBrackets !== -1 && currentTrackNoSquareBrackets !== -1) {
        currentTrackTitle = (currentTrackNoBrackets < currentTrackNoSquareBrackets) ? currentTrackTitle.slice(0, currentTrackNoBrackets) : currentTrackTitle.slice(0, currentTrackNoSquareBrackets);
    } else if (currentTrackNoBrackets !== -1) {
        currentTrackTitle = currentTrackTitle.slice(0, currentTrackNoBrackets);
    } else if (currentTrackNoSquareBrackets !== -1) {
        currentTrackTitle = currentTrackTitle.slice(0, currentTrackNoSquareBrackets);
    }

    let currentTrackFt = currentTrackTitle.indexOf("ft.");
    let currentTrackFeat = currentTrackTitle.indexOf("feat.");

    if (currentTrackFt !== -1 && currentTrackFeat !== -1) {
        currentTrackTitle = (currentTrackFt < currentTrackFeat) ? currentTrackTitle.slice(0, currentTrackFt) : currentTrackTitle.slice(0, currentTrackFeat);
    } else if (currentTrackFt !== -1) {
        currentTrackTitle = currentTrackTitle.slice(0, currentTrackFt);
    } else if (currentTrackFeat !== -1) {
        currentTrackTitle = currentTrackTitle.slice(0, currentTrackFeat);
    }

    return currentTrackTitle;
}

function insertTracksIntoPlaylistInner(tracks, playlistId, token, data, failed, resolve, reject) {
    if (tracks.length > 0) {
        let currentTrack = tracks.shift();
        let currentTrackTitle = currentTrack.snippet.title;

        currentTrackTitle = removeBracketsAndFeatures(currentTrackTitle);

        let title = currentTrackTitle.trim().split("-");
        let artist = null;
        let name = null;
        if (title.length > 1) {
            artist = title[0];
            name = title[1];
        } else {
            name = title[0];
        }

        searchForTracksSpotify(token, name, artist).then((songId) => {
            data.push(songId);
        }).then(() => {
            insertTracksIntoPlaylistInner(tracks, playlistId, token, data, failed, resolve, reject);
        }).catch((error) => {
            failed.push(artist + " - " + name);
            insertTracksIntoPlaylistInner(tracks, playlistId, token, data, failed, resolve, reject);
        });

    } else {
        insertIntoPlaylist(playlistId, token, data).then(() => {
            resolve(failed);
        });
    }
}

//INSERT INTO PLAYLIST - LAST STEP
function insertIntoPlaylist(playlistId, token, data) {
    let url = BASESPOTIFYAPILINK + "/users/me/playlists/" + playlistId + "/tracks";

    for (var i = 0; i < data.length; i++) {
        data[i] = "spotify:track:" + data[i];
    }

    let options = {
        'method': 'POST',
        'body': JSON.stringify({
            "uris": [
                ...data
            ],
        }),
        'headers': {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            "Accept": "application/json",
        }
    }

    return fetch(url, options).then((response) => {
        console.log(response);
    })
}