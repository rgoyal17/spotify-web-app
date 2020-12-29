import React from 'react';
import { Container} from 'reactstrap';
import { Link } from 'react-router-dom';

class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  searchChange = () => {
    this.props.spotifyApi.setAccessToken(this.props.token)
    this.props.spotifyApi.searchTracks('Love')
    .then(function(data) {
      console.log('Search by "Love"', data.body);
    }, function(err) {
      console.error(err);
    });
  }

  render() {
    return (
        <div>
          <div className="home-icon">
            <Link to="/"><i className="fas fa-home fa-3x"></i></Link>
          </div>
          <h1 className="explore-heading">Explore Music</h1>
          <div className="search-bar">
            <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.searchChange} />
          </div>
          <Container>

          </Container>
        </div>
    );
  }
}

export default ExplorePage;