import React from 'react';
import Navigation from './Navigation'
import Description from './Description'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
        <div>
            <div>
                <Navigation user_token={this.props.user_token} logout={this.props.logout} />
            </div>
            <div>
                <Description />
            </div>
        </div>
    );
  }
}

export default HomePage;