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
      token : ''
    }
  }

  async componentDidMount() {
    let token = await this.sendRequest()
    spotifyApi.setAccessToken(token);
  }

  async sendRequest() {
    try {
        let response = await fetch("http://127.0.0.1:5000/token");
        if (!response.ok) {
            alert("Error in fetching token!");
            return;
        }
        let parsed = await response.json();
        if (parsed.token !== '') {
          this.setState({token: parsed.token})
          return parsed.token
        }
    } catch (e) {
        alert(e);
    }
  }

  loginCallback = () => {
    this.setState({token: ''})
  }

  render() {
    return (
        <div>
            <Switch>
              <Route exact path='/' render={(props) => <HomePage {...props} token={this.state.token} loginCallback={this.loginCallback} />} />
              <Route path='/explore' render={(props) => <ExplorePage {...props} spotifyApi={spotifyApi} />} />
              <Route path='/quiz' render={(props) => <QuizPage {...props} />} />
              <Redirect to='/' />
            </Switch>
        </div>
    );
  }
}

export default App;