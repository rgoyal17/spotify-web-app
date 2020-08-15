import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();


class App extends React.Component {
  constructor(props){
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;

    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      topTracks: {},
      trackAnalysis: {},
      trackFeatures: {}
    }
  }


  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getTopTracks() {
    spotifyApi.getMyTopTracks()
        .then((response) => {
          console.log(response);
          this.setState({topTracks: response});
        })
  }

  getTrackAnalysis() {
    spotifyApi.getAudioAnalysisForTrack(this.state.topTracks.items[0].id)
        .then((response => {
          console.log(response);
          this.setState({trackAnalysis: response});
        }))
  }

  getTrackFeatures() {
    spotifyApi.getAudioFeaturesForTrack(this.state.topTracks.items[0].id)
        .then((response => {
          console.log(response);
          this.setState({trackFeatures: response});
        }))
  }

  getRecommendations() {
    spotifyApi.getRecommendations({seed_artists: ["01y8iBZYk8aeNfPsuTVrAt", "3i8iJVU0mtgzbZsuF1AoJ3"],
      seed_tracks: ["6QSH5lHbiKxOTqc9WSdi09", "4kFoTDLdg7VjMPjWLdmqaC"],
      seed_genres: ["country"]})
        .then((response) => {
          console.log(response);
        })
  }

  render() {
    // console.log(JSON.stringify(this.state.trackAnalysis));
    // if (Object.keys(this.state.trackFeatures).length !== 0) {
    //     console.log(this.state.topTracks.items[0].external_urls.spotify);
    //     console.log(JSON.stringify(this.state.trackAnalysis));
    //     console.log(this.state.trackFeatures);
    // }
    return (
        <div className="App">
          <a href='http://localhost:8888'>Login to Spotify </a>
          <div>
            <button onClick={() => this.getTopTracks()}>
              Get My Top Tracks/Artists
            </button>
          </div>
          <div>
            <button onClick={() => this.getTrackAnalysis()}>
              Get Track Analysis
            </button>
          </div>
          <div>
            <button onClick={() => this.getTrackFeatures()}>
              Get Track Features
            </button>
          </div>
          <div>
            <button onClick={() => this.getRecommendations()}>
              Get Recommendations
            </button>
          </div>
        </div>
    );
  }
}

export default App;