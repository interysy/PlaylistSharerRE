import { getTracksFromPlaylistYoutube, getInformationUsingSelenium } from '../youtube/youtube_funcs'

const BASESPOTIFYAPILINK = "https://api.spotify.com/v1";
const AUTHORIZELINK = 'https://accounts.spotify.com/authorize?';
const REDIRECT_URI = `http://localhost:3000/gettoken`;
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
    console.log("Getting playlists spotify");
    let url = BASESPOTIFYAPILINK + '/me/playlists?limit=50';

    return Promise.all([
        new Promise((resolve, reject) => {
            getData(url, [], token, resolve, reject);
        }),
    ])
}

export function getTracksFromPlaylistSpotify(token, playlist) {
    console.log("Getting playlists from spotify")
    var url = "https://api.spotify.com/v1/playlists/" + playlist + "/tracks?limit=50";

    return Promise.all([
        new Promise((resolve, reject) => {
            getData(url, [], token, resolve, reject);
        }),
    ])
}

export function getData(url, data, token, resolve, reject) {
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


export function searchForTracksSpotify(token, name, artist) {
    console.log("Searching for track in spotify");
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
                resolve("");
            } else {
                resolve(responseAsJson.tracks.items[0].id);
            }
        }).catch((error) => {
            resolve(error);
        })
    });

}



export function createPlaylistsSpotify(playlists, spotifyToken) {
    let url = BASESPOTIFYAPILINK + '/me/playlists';
    return Promise.all([
        new Promise((resolve, reject) => {
            createPlaylistsSpotifyInner(url, playlists, spotifyToken, [], reject, resolve);
        }),
    ])
}

export function createPlaylistSpotify(playlist, token, url) {
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
                resolve(responseAsJson.id);
            }).catch((error) => {
                console.log(error);
                reject(error);
            })
        }),
    ])

}

export function createPlaylistsSpotifyInner(url, playlists, spotifyToken, data, reject, resolve) {
    if (playlists.length > 0) {
        let currentPlaylist = playlists.shift();
        currentPlaylist = currentPlaylist.split("%");
        let currentPlaylistName = currentPlaylist[1];
        let currentPLaylistId = currentPlaylist[2];
        createPlaylistSpotify(currentPlaylistName, spotifyToken, url).then((response) => {
            data.push({
                name: currentPlaylistName,
                oldId: currentPLaylistId,
                newId: response[0],
            });
            return data;
        }).then((data) => {
            createPlaylistsSpotifyInner(url, playlists, spotifyToken, data, reject, resolve);
        })

    } else {
        resolve(data);
    }

}


export function getTracksToTransferToPlaylists(playlists, youtubeToken, youtubeApiKey) {
    return (Promise.all([
        new Promise((resolve, reject) => {
            getTracksToTransferToPlaylistsInner(playlists, [], resolve, reject, youtubeToken, youtubeApiKey);
        }),
    ]));

}


export function getTracksToTransferToPlaylistsInner(playlists, data, resolve, reject, youtubeToken, youtubeApiKey) {
    if (playlists.length > 0) {
        let currentPlaylist = playlists.shift();
        currentPlaylist = currentPlaylist[0];
        let currentPlaylistYoutubeId = currentPlaylist.oldId;
        getTracksFromPlaylistYoutube(youtubeToken, youtubeApiKey, currentPlaylistYoutubeId).then((response) => {
            currentPlaylist.tracks = response
            data.push(currentPlaylist)
            return data
        }).then((data) => {
            getTracksToTransferToPlaylistsInner(playlists, data, resolve, reject, youtubeToken, youtubeApiKey);
        }).catch((error) => {
            console.log(error);
            reject(error)
        })

    } else {
        resolve(data);
    }

}


export function insertTracksIntoPlaylist(tracks, playlistId, token, data) {
    if (tracks.length > 0) {
        let currentTrack = tracks.shift();
        let title = currentTrack.snippet.title.replace(/\([^()]*\)/g, '').trim().split("-");
        let artist = null;
        let name = null;
        console.log(title);
        if (title.length > 1) {
            artist = title[0];
            name = title[1];
        } else {
            name = title[0];
        }

        searchForTracksSpotify(token, name, artist).then((songId) => {
            data.push(songId);
        }).then(() => {
            insertTracksIntoPlaylist(tracks, playlistId, token, data);
        });

    } else {
        insertIntoPlaylist(playlistId, token, data);
        return;
    }
}

function insertIntoPlaylist(playlistId, token, data) {

    let url = BASESPOTIFYAPILINK + "/users/me/playlists/" + playlistId + "/tracks";
    data = data.filter(element => (typeof element === typeof "" && element != ""));
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

    fetch(url, options).then((response) => {
        console.log(response);
    })
}


export function handlePlaylists(playlists, spotifyToken, failed) {
    if (playlists.length > 0) {
        let currentPlaylist = playlists.shift();
        currentPlaylist = currentPlaylist[0]
        let currentPlaylistSpotifyId = currentPlaylist.newId;
        let currentPlaylistTracksToAdd = currentPlaylist.tracks[0];
        insertTracksIntoPlaylist(currentPlaylistTracksToAdd, currentPlaylistSpotifyId, spotifyToken, []).then(() => {
            handlePlaylists(playlists, spotifyToken, failed);
        });
    }
}

export function transferToSpotify(playlists, spotifyToken, youtubeToken, youtubeApiKey) {
    createPlaylistsSpotify(playlists, spotifyToken).then((createdPlaylists) => {
        getTracksToTransferToPlaylists(createdPlaylists, youtubeToken, youtubeApiKey).then((playlistsWithTracks) => {
            let failed = handlePlaylists(playlistsWithTracks, spotifyToken, []);
        })
    })
}