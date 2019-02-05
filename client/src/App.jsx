import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './Components/Main/Main';
import Create from './Components/Create/Create';
import Traveler from './Components/Traveler/Traveler';
import Trip from './Components/Trip/Trip';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/' exact component={Main} />
          <Route path='/create/' exact component={Create} />
          <Route path='/trip/:tripId' exact component={Traveler} />
          <Route path='/trip/:tripId/:userId' exact component={Trip} />
        </div>
      </Router>
    );
  }
}

export default App;
