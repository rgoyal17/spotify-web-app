import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  loginToggle = () => {
    if (this.props.user_token === '') {
      window.open("http://127.0.0.1:5000/login", "_self")
    } else {
      const spotifyLogoutWindow = window.open("https://accounts.spotify.com/en/logout", 'Spotify Logout', 'width=700,height=500,top=40,left=40')
      setTimeout(() => spotifyLogoutWindow.close(), 750)
      this.props.logout();
    }
  }

  render() {
    return (
        <div>
          <div className="nav-buttons">
            <Link to="/explore"><Button className="nav-button" color="primary">Explore Music</Button></Link>
            <Button type="submit" onClick={this.loginToggle} className="nav-button" color="primary">{this.props.user_token === '' ? "Log In" : "Log Out"}</Button>
            <Link to="/quiz"><Button className="nav-button" color="primary">Quiz</Button></Link>
          </div>
        </div>
    );
  }
}

export default Navigation;