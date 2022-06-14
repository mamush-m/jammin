import logo from '../../logo.svg';
import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar'
import Spotify from '../Spotify/Spotify';
// import SearchResults from '../SearchResults/SearchResults';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Spotify: Spotify
    }
  }

  render() {
    return (
       <div className='superParent'>
         <h1>Spotify Playlist Creator</h1>
         <div className='instructions'>
           <h2>Instructions</h2>

           <p><h4>Step 1:</h4> Search a song, artist, or album in the box under "Search Here"</p>
           <p> <h4>Step 2:</h4> Click "Search Spotify"</p>
           <p><h4>Step 3:</h4> The tracks will display in the light green section on the left. For each song you want to add, click the red "+" button on the right end and it will be added to the red playlist section on the right.</p>
           <p><h4>Step 4:</h4> Type in what you would like to name the playlist and click "Save Playlist".</p>
         </div>

         <SearchBar Spotify={this.state.Spotify}/>
       </div>
    );
  }
}

export default App;
