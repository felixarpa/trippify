import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './Components/Main/Main';
import Create from './Components/Create/Create';
import Join from './Components/Join/Join';
import Traveler from './Components/Traveler/Traveler';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/' exact component={Main} />
          <Route path='/create/' component={Create} />
          <Route path='/join/' component={Join} />
          <Route path='/trip/:tripId' component={Traveler} />
        </div>
      </Router>
    );
  }
}

export default App;
