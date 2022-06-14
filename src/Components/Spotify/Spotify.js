import { type } from "@testing-library/user-event/dist/type";

let accessToken;
const clientID = '18ee32edd7e64022a700d89922dfb737';
let currURL = window.location.href;
const redirectURI = 'http://truculent-collar.surge.sh/'
let authorizationURL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&redirect_uri=${redirectURI}`;
const Spotify = {

     getAccessToken() {

        if(accessToken) {
            return accessToken
        }

        if(!accessToken && currURL.includes('access_token')) {
            const expireTimeMatch = currURL.match(/expires_in=([^&]*)/);
            const expireTime = expireTimeMatch[1]
            setTimeout(() => {currURL = authorizationURL}, expireTime * 1000)
            
            const accessTokenArr = currURL.match(/access_token=([^&]*)/);
            accessToken = accessTokenArr[1];
            return accessToken;
        }

        if(!accessToken && !currURL.includes('access_token')) {
            window.location.href = authorizationURL;
        }
    },

     searchTrack(searchTerm) {
         const accessToken = Spotify.getAccessToken();

       return fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then(response => response.json())
        .then(jsonResponse => jsonResponse.tracks.items)
    },

    getUserID() {
        const accessToken = Spotify.getAccessToken();

        return fetch('https://api.spotify.com/v1/me', {
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then(response => response.json())
        .then(jsonResponse => jsonResponse.id)
    },

    makePlaylist(userID, playlistName, trackURI) {
        const accessToken = Spotify.getAccessToken();
        const requestBody = {
            name: playlistName
        }

        fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: 'POST',
            headers: {Authorization: `Bearer ${accessToken}`},
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(jsonResponse => {
            Spotify.addTracks(trackURI, jsonResponse.id)
        })
        
    },

    createPlaylist(playlistName, trackURI) {
        Spotify.getUserID().then(retrievedID => {
            Spotify.makePlaylist(retrievedID, playlistName, trackURI)
        }).catch(err => {console.log(err)})
    },

    addTracks(trackURI, playlistID) {
        const accessToken = Spotify.getAccessToken();
        const body = {
            uris: trackURI
        }

        fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: 'POST',
            headers: {Authorization: `Bearer ${accessToken}`},
            body: JSON.stringify(body)
        }).then(response => response.json())
        .then(jsonResponse => console.log(jsonResponse)).then(window.alert('playlist created!')).then(window.location.reload())
    }
    
}

export default Spotify;




