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