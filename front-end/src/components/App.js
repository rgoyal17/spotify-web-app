import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './HomePage';
import ExplorePage from './ExplorePage'
import QuizPage from './QuizPage'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
        <div>
            <Switch>
              <Route exact path='/' render={(props) => <HomePage {...props} />} />
              <Route path='/explore' render={(props) => <ExplorePage {...props} />} />
              <Route path='/quiz' render={(props) => <QuizPage {...props} />} />
              <Redirect to='/' />
            </Switch>
        </div>
    );
  }
}

export default App;