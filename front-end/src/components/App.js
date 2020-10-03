import React from 'react';
import Navigation from './Navigation'
import Description from './Description'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
        <div>
            Home
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

export default App;