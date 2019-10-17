import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';

require('dotenv').config();
// import socketIOClient from 'socket.io-client';
// const endpoint = `${process.env.REACT_APP_API_BASE_URL}`;
// const socket = socketIOClient(endpoint);

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
