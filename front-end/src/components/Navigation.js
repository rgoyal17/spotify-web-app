import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  loginToggle = () => {
    const url = this.props.loggedIn ? "https://www.spotify.com/logout" : "http://localhost:8888/login"
    window.open(url, "_self")
  }

  render() {
    return (
        <div>
          <div className="nav-buttons">
            <Link to="/explore"><Button className="nav-button" color="primary">Explore Music</Button></Link>
            <Button type="submit" onClick={this.loginToggle} className="nav-button" color="primary">{this.props.loggedIn ? "Log Out" : "Log In"}</Button>
            <Link to="/quiz"><Button className="nav-button" color="primary">Quiz</Button></Link>
          </div>
        </div>
    );
  }
}

export default Navigation;