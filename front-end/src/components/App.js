import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './HomePage';
import ExplorePage from './ExplorePage'
import QuizPage from './QuizPage'
// const SpotifyWebApi = require('spotify-web-api-node');
// const spotifyApi = new SpotifyWebApi({
//   clientId: 'f2d6728148db4fdaae6137fb108b8724',
//   clientSecret: 'a8fecbb751c94c5a953e852504101688',
//   redirectUri: 'http://localhost:3000/'
// });

// spotifyApi.setAccessToken('BQAsSmtN4sx5rxi4Gx9F1n1foD8h-AOVP7ywwAAflt5dXJFCs9UJDoSv6bvr7OxlCQdjsZJbU5_npe8bGvLcYDyDyZvuw4-AYObcVU9zXFcnBKsDGyj-YaUEp8063EK07YrP-522-98G7g6jszNXGE_pQ9KS_CCo3k1thiX4S6Wr0lhYWCqjnd_OsA');

// spotifyApi.searchTracks('Love')
//   .then(function(data) {
//     console.log('Search by "Love"', data.body);
//   }, function(err) {
//     console.error(err);
//   });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
        <div>
            <Switch>
              <Route exact path='/' render={(props) => <HomePage {...props} loggedIn={this.state.loggedIn} />} />
              <Route path='/explore' render={(props) => <ExplorePage {...props} />} />
              <Route path='/quiz' render={(props) => <QuizPage {...props} />} />
              <Redirect to='/' />
            </Switch>
        </div>
    );
  }
}

export default App;