import React from 'react';
import { Button } from 'reactstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
        <div>
            <div className="nav-buttons">
                <Button className="nav-button" color="primary">Explore Music</Button>
                <Button className="nav-button" color="primary">Log In</Button>
                <Button className="nav-button" color="primary">Quiz</Button>
            </div>
        </div>
    );
  }
}

export default Navigation;