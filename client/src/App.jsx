import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './Components/Main/Main';
import Create from './Components/Create/Create';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/' exact component={Main} />
          <Route path='/create/' exact component={Create} />
        </div>
      </Router>
    );
  }
}

export default App;
