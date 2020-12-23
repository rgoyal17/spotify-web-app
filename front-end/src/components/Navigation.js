import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
        <div>
            <div className="nav-buttons">
                <Link to="/explore"><Button className="nav-button" color="primary">Explore Music</Button></Link>
                <Link to="/"><Button className="nav-button" color="primary">Log In</Button></Link>
                <Link to="/quiz"><Button className="nav-button" color="primary">Quiz</Button></Link>
            </div>
        </div>
    );
  }
}

export default Navigation;