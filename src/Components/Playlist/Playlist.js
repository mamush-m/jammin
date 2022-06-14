import React from "react";
import '../Playlist/Playlist.css'
import Spotify from "../Spotify/Spotify";

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            playlistName: ''
        }
        this.getID = this.getID.bind(this);
        this.playlistNaming = this.playlistNaming.bind(this)
        this.createPlaylist = this.createPlaylist.bind(this)
    }

    getID() {
        Spotify.getUserID()
        .then(data => {
            console.log(data)
            this.setState({userID: data})
        })
    }

    playlistNaming(e) {
        const value = e.target.value;
        this.setState({playlistName: value})
    }

    createPlaylist() {
        const trackURI = this.props.playlistTracks.map(track => track.uri)
        Spotify.createPlaylist(this.state.playlistName, trackURI)
    }

    render() {
        const playlistSongs = this.props.playlistTracks.map((track, index) => {
            return <li key={index}>
                {track.songName}
            </li>
        })

        const userID = Spotify.getUserID()

        return (
            <div className="container" id="playlistCon">
                <div className="playlist">

                    <div id="playlist-creator">

                        <h3>Playlist Generator</h3>

                        <div id="playlist-title">
                            <input placeholder="Playlist name" onInput={this.playlistNaming}/>
                            <button onClick={this.createPlaylist}>Save Playlist</button>
                        </div>
                        
                    </div>
                    
                    <ul>
                       {playlistSongs}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Playlist;