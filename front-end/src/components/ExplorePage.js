import React from 'react';
import { Link } from 'react-router-dom';

class ExplorePage extends React.Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();

    this.state = {
      serachResults: [],
      showDisplay: false
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      if (this.state.showDisplay) {
        this.setState({showDisplay: false})
      }
    }
  }

  async selectSong(songId) {
    try {
      this.props.spotifyApi.getAudioFeaturesForTrack(songId)
      .then(async (data) => {
        console.log(data)
        let response = await fetch("http://127.0.0.1:5000/recommend?songId=" + songId
          + "&acousticness=" + data.body.acousticness + "&danceability=" + data.body.danceability
          + "&energy=" + data.body.energy + "&instrumentalness=" + data.body.instrumentalness
          + "&liveness=" + data.body.liveness + "&loudness=" + data.body.loudness
          + "&speechiness=" + data.body.speechiness + "&tempo=" + data.body.tempo
          + "&valence=" + data.body.valence);
        if (!response.ok) {
            alert("Error in fetching song recommendations!");
            return;
        }
        let parsed = await response.json();
        console.log(parsed)
      })
      .catch((err) => {
        console.error(err);
      });
    } catch (e) {
        alert(e);
    }
  }

  searchChange = (event) => {
    event.preventDefault()
    if (!this.state.showDisplay) {
      this.setState({showDisplay: true})
    }
    this.props.spotifyApi.searchTracks(event.target.value)
    .then((data) => {
      this.setState({serachResults: data.body.tracks.items})
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render() {
    let options = this.state.serachResults.map((song) => {
      return <div id={song.id} key={song.id} className="song-results" onClick={() => this.selectSong(song.id)}><img src={song.album.images[0].url} alt={song.name} height="50px" width="50px" /> {song.name} - {song.artists[0].name}</div>
    })

    return (
        <div>
          <div className="home-icon">
            <Link to="/"><i className="fas fa-home fa-3x"></i></Link>
          </div>
          <h1 className="explore-heading">Explore Music</h1>
          <div id="song-search">
            <input className="form-control" id="search-bar" type="text" placeholder="Search" onChange={(event) => this.searchChange(event)} />
            <div ref={this.wrapperRef} style={{display: this.state.showDisplay ? "block" : "none"}}>
              {options}
            </div>
          </div>
        </div>
    );
  }
}

export default ExplorePage;