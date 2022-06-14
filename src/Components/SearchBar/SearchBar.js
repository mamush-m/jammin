import React from "react";
import SearchResults from '../SearchResults/SearchResults'
import "../SearchBar/SearchBar.css"
import Playlist from '../Playlist/Playlist';
import { toHaveAccessibleDescription } from "@testing-library/jest-dom/dist/matchers";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [],
            searchBarValue: false,
            playlistTracks: []
        }

        this.handleInput = this.handleInput.bind(this)
        this.valueChecker = this.valueChecker.bind(this);
        this.addToPlaylist = this.addToPlaylist.bind(this);        
    }

    handleInput() {
        const input = document.getElementById('box').value;
        const Spotify = this.props.Spotify;
        Spotify.searchTrack(input).then(data => this.setState({value: data}))
    }

    valueChecker() {
        const input = document.getElementById('box').value;
        if(input) {
            this.setState({searchBarValue: true})
        }else {
            this.setState({searchBarValue: false})
        }
    }

    alert() {
        window.alert('no')
    }

    simpleFunc(word) {
        console.log(word);
    }

    addToPlaylist(track) {
        this.state.playlistTracks.forEach(playlistTrack => {
            if(playlistTrack.id === track.id) {
                // window.alert('already in playlist')
                return;
            }
            return;
        })


        const newPlaylistTracks = this.state.playlistTracks;
        newPlaylistTracks.push(track);
        this.setState({playlistTracks: newPlaylistTracks})

        return;
    }

    render() {
        const searchBarValue = this.state.searchBarValue;
        return (
             <div className="searchBar">
                 <h3>Search Here</h3>
                 <form>
                    <input type='text' className="searchBox" id="box" onInput={this.valueChecker}/>
                    <input className="searchButton" type="submit" value="Search Spotify" onClick={searchBarValue? this.handleInput : this.alert}/>
                 </form>

                 <div className="parent" id="mains">
                     
                    <div className="children" id="searchResults">
                        <SearchResults searchTerm={this.state.value} addTracks={this.addToPlaylist} id='searchresults'/>
                    </div>

                    <div className="children" id="playlist">
                        <Playlist playlistTracks={this.state.playlistTracks} id='playlist'/>
                    </div>

                 </div>

             </div>
        );
    }
}

export default SearchBar