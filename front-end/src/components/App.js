import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './HomePage';
import ExplorePage from './ExplorePage'
import QuizPage from './QuizPage'

const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
  clientId: 'f2d6728148db4fdaae6137fb108b8724',
  clientSecret: 'a8fecbb751c94c5a953e852504101688',
  redirectUri: 'http://127.0.0.1:5000/callback'
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      app_token : '',
      user_token: ''
    }
  }

  async componentDidMount() {
    this.sendRequest()
  }

  async sendRequest() {
    try {
        let response = await fetch("http://127.0.0.1:5000/authorization");
        if (!response.ok) {
            alert("Error in fetching token!");
            return;
        }
        let parsed = await response.json();
        this.setState({app_token: parsed.token})
        spotifyApi.setAccessToken(parsed.token);
    } catch (e) {
        alert(e);
    }

    try {
      let response = await fetch("http://127.0.0.1:5000/token");
      if (!response.ok) {
          alert("Error in fetching token!");
          return;
      }
      let parsed = await response.json();
      if (parsed.token !== '') {
        this.setState({user_token: parsed.token})
        spotifyApi.setAccessToken(parsed.token);
      }
    } catch (e) {
        alert(e);
    }
  }

  logout = () => {
    this.setState({user_token: ''})
    spotifyApi.setAccessToken(this.state.app_token);
  }

  render() {
    console.log(this.state.user_token)
    return (
        <div>
            <Switch>
              <Route exact path='/' render={(props) => <HomePage {...props} user_token={this.state.user_token} logout={this.logout} />} />
              <Route path='/explore' render={(props) => <ExplorePage {...props} spotifyApi={spotifyApi} />} />
              <Route path='/quiz' render={(props) => <QuizPage {...props} />} />
              <Redirect to='/' />
            </Switch>
        </div>
    );
  }
}

export default App;