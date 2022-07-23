export function getPlaylists(token, api_key) {
    let initial_playlist_link = "https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&maxResults=25&mine=true&key=" + api_key;

    return (Promise.all([
        new Promise((resolve, reject) => {
            getData(initial_playlist_link, [], resolve, reject, token);
        }),
    ]));

}

export function getTracksFromPlaylistYoutube(token, api_key, playlist) {
    let url = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails%2Cid%2Cstatus&maxResults=50&playlistId=' + playlist + '&key=' + api_key;


    return (Promise.all([
        new Promise((resolve, reject) => {
            getData(url, [], resolve, reject, token);
        }),
    ]));

}
export function insertIntoPlaylist(token, api_key, playlist, video) {
    let url = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=id%2Csnippet&key=' + api_key;
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
        return responseAsJson;
    })

}

export function searchForTrack(token, api_key, artist, title) {
    let url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + artist.replace(" ", "%") + '%-%' + title.replace(" ", "%") + '&key=' + api_key;

    return fetch(url, {
        'headers': {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
        }
    }).then((response) => {
        return response = response.json();
    }).then((responseAsJson) => {
        return responseAsJson.items[0].id.videoId
    }).catch((error) => console.log(error));
}

export function createPlaylist(token, api_key, title) {
    let description = 'Playlist shared from Spotify!';
    let url = 'https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2Cstatus&key=' + api_key;
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
    })

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
            if (response.nextPageToken) {
                getData(url + "&pageToken=" + response.nextPageToken, retrievedData, resolve, reject, token)
            } else {
                resolve(retrievedData)
            }
        }).catch(error => {
            console.log(error)
            reject(error)
        })
}