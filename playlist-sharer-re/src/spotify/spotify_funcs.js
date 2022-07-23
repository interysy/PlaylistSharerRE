let baseSpotifyAPI = "https://api.spotify.com/v1";


export function getTracksFromPlaylist(token, playlist) {
    var url = "https://api.spotify.com/v1/playlists/" + playlist + "/tracks?limit=50";

    return Promise.all([
        new Promise((resolve, reject) => {
            getData(url, [], resolve, reject, token)
        }),
    ])
}

export function getPlaylists(token) {

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
        .then((response) => response.json())
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