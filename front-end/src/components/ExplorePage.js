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

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      if (this.state.showDisplay) {
        this.setState({showDisplay: false})
      }
    }
  }

  render() {
    let options = this.state.serachResults.map((song) => {
      return <div id={song.id} key={song.id} className="song-results"> <img src={song.album.images[0].url} alt={song.name} height="45px" width="45px" /> {song.name} - {song.artists[0].name}</div>
    })

    return (
        <div>
          <div className="home-icon">
            <Link to="/"><i className="fas fa-home fa-3x"></i></Link>
          </div>
          <h1 className="explore-heading">Explore Music</h1>
          <input className="form-control" type="text" placeholder="Search" onChange={(event) => this.searchChange(event)} />
          <div ref={this.wrapperRef} style={{display: this.state.showDisplay ? "block" : "none"}}>
            {options}
          </div>
        </div>
    );
  }
}

export default ExplorePage;