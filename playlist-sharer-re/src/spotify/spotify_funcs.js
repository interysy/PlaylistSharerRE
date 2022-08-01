import { getTracksFromPlaylistYoutube } from '../youtube/youtube_funcs'


const baseSpotifyAPI = "https://api.spotify.com/v1";

const AUTHORIZELINK = 'https://accounts.spotify.com/authorize?';
const REDIRECT_URI = `http://localhost:3000/gettoken`;

const clientId = 'aa7e8d29948e4e2fb53937b11adb69ed'

export function getAuthorisationPageLinkImplicitGrant() {
    let state = generateRandomString(16);
    return [AUTHORIZELINK + new URLSearchParams({
        response_type: "token",
        client_id: clientId,
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
// export function getTracksFromPlaylists(token, playlists) {

//     return Promise.all([
//         new Promise((resolve, reject) => {
//             getTracksFromPlaylistInner(token, playlists, resolve, reject);
//         }),
//     ])

// }

// export function getTracksFromPlaylistsInner(token, playlists, resolve, reject) {
//     if (playlists.length > 0) {
//         let currentPlaylist = playlists.shift();
//         let currentPlaylistSplit = currentPlaylist.split("%");
//         let currentPlaylistName = currentPlaylistSplit[0];
//         let currentPlaylistId = currentPlaylistSplit[1];

//         getTracksFromPlaylist(token, currentPlaylistId).then((response) => {
//             data.push({
//                 tracks: response,
//                 newId: response,
//                 oldId: currentPlaylistId
//             });
//             getTracksFromPlaylists(token, playlists);
//         })
//     } else {
//         return data
//     } 
// } 

// export function searchForTracksSpotify(token, name, artist) {
//     let url = (artist === null) ? 'https://api.spotify.com/v1/search?q=track:' + name + '&type=track&limit=1' : 'https://api.spotify.com/v1/search?q=track:' + name + '%20artist:' + artist + '&type=track&limit=1';

//     return Promise.all([
//         new Promise((resolve, reject) => {
//             fetch(url, {
//                 headers: {
//                     "Accept": "application/json",
//                     'Authorization': 'Bearer ' + token,
//                     "Content-Type": "application/json",
//                     "Access-Control-Allow-Origin": "http://localhost:3000/*",

//                 }
//             }).then((response) => {
//                 return response.json();
//             }).then((responseAsJson) => {
//                 return responseAsJson.tracks[0]
//             })
//         }),
//     ]);
// }

export function getPlaylistsSpotifyFunc(token) {

    var playlists_url = baseSpotifyAPI + '/me/playlists?limit=50';

    return Promise.all([
        new Promise((resolve, reject) => {
            getData(playlists_url, [], resolve, reject, token)
        }),
    ])
}


export function getData(url, data, resolve, reject, token) {
    fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            let responseAsJson = response.json();
            return responseAsJson;
        })
        .then((response) => {
            let retrievedData = data.concat(response.items);
            if (response.next !== null) {
                getData(response.next, retrievedData, resolve, reject, token)
            } else {
                console.log(retrievedData)
                resolve(retrievedData)
            }
        }).catch(error => {
            console.log(error)
            reject(error)
        })
}


export function getTracksFromPlaylistSpotify(token, playlist) {
    var url = "https://api.spotify.com/v1/playlists/" + playlist + "/tracks?limit=50";
    console.log("Getting Tracks from " + playlist)

    return Promise.all([
        new Promise((resolve, reject) => {
            getData(url, [], resolve, reject, token)
        }),
    ])
}


export function createPlaylistsSpotify(playlists, spotifyToken) {
    let url = baseSpotifyAPI + '/me/playlists';
    return Promise.all([
        new Promise((resolve, reject) => {
            createPlaylistsSpotifyInner(url, playlists, spotifyToken, [], reject, resolve);
        }),
    ])
}

export function createPlaylistSpotify(playlist, token, url) {
    let description = "Shared from PlaylistSharerRE";
    console.log("Creation ... ")

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
    console.log("Creating a singular playlist");
    if (playlists.length > 0) {
        let currentPlaylist = playlists.shift();
        currentPlaylist = currentPlaylist.split("%");
        console.log(currentPlaylist)
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
        })

    } else {
        console.log(data);
        resolve(data);
    }

}


export function getTracksToTransferToPlaylists(playlists, youtubeToken, youtubeApiKey) {
    console.log("Working from youtube functions");
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
        console.log(data);
        resolve(data);
    }

}


export function handlePlaylists(playlists, spotifyToken, failed) {
    if (playlists.length > 0) {
        let currentPlaylist = playlists.shift();
        let currentPlaylistSpotifyId = currentPlaylist.newId;
        let currentPlaylistTracksToAdd = currentPlaylist.tracks[0];
    }
}

export function transferToSpotify(playlists, spotifyToken, youtubeToken, youtubeApiKey) {
    createPlaylistsSpotify(playlists, spotifyToken).then((createdPlaylists) => {
        getTracksToTransferToPlaylists(createdPlaylists, youtubeToken, youtubeApiKey).then((playlistsWithTracks) => {
            let failed = handlePlaylists(playlistsWithTracks, spotifyToken, []);
        })
    })
}