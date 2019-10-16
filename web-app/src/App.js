import React from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';

const endpoint = '/api/message';
const socket = socketIOClient('', { path: endpoint });

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
