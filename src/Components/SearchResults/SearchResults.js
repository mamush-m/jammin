import React from "react";
import './SearchResults.css';
// import Spotify from "../Spotify/Spotify";

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistTracks: []
        }
        this.addToPlaylist = this.addToPlaylist.bind(this);
    }

    addToPlaylist(e) {
        const parent = e.target.parentElement
        // console.log(parent.attributes)


        const trackObj = {}
        trackObj.album = parent.attributes.album.value;
        trackObj.id = parent.attributes.songid.value;
        trackObj.songName = parent.attributes.songname.value;
        trackObj.uri = parent.attributes.uri.value;
        console.log(trackObj)


        this.props.addTracks(trackObj);
        // console.log(this.props)
    }

    message(e) {
        const message = e.target;
        console.log(message)
    }


    render() {
        const song = this.props.searchTerm.map((song, ind) => {
            return <li className="song" key={ind} songname={song.name} songid={song.id} album={song.album.name} uri={song.uri}>{song.name}  <p onClick={this.addToPlaylist}>+</p> <br/>
            {
                song.artists.map((artist, index) => <h5 key={index}>{artist.name}</h5>)
                
            }
            </li>
        })


        return (
             <div className="container" id="searchresultsCon">
                 <div className="child">
                     <h3 onClick={this.message} id='message' another='car'>Search Results</h3>


                     <ul className="searchList">
                        {song}
                     </ul>

                 </div>
             </div>
        );
    }
}

export default SearchResults;