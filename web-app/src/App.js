import React from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';

require('dotenv').config();

const endpoint = `${process.env.REACT_APP_API_BASE_URL}/api/message`;
const socket = socketIOClient(endpoint);

class App extends React.Component {
  componentDidMount = () => {
    console.log(endpoint);
    socket.emit('connection');
  };

  testSocket = () => {
    console.log('clicked');
    socket.emit('message', 'test front');
  };
  render() {
    return (
      <div className="App">
        <button onClick={this.testSocket}></button>
      </div>
    );
  }
}

export default App;
