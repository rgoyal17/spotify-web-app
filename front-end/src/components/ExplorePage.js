import React from 'react';
import { Container} from 'reactstrap';
import { Link } from 'react-router-dom';

class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
        <div>
          <div className="home-icon">
            <Link to="/"><i class="fas fa-home fa-3x"></i></Link>
          </div>
          <h1 className="explore-heading">Explore Music</h1>
          <div className="search-bar">
            <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
          </div>
          <Container>

          </Container>
        </div>
    );
  }
}

export default ExplorePage;