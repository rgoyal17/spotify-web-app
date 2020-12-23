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
                <Navigation></Navigation>
            </div>
            <div>
                <Description></Description>
            </div>
        </div>
    );
  }
}

export default HomePage;