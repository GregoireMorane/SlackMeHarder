import React from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';


class App extends React.Component {

  componentDidMount = () => {
    const socket = socketIOClient('/api/message');
    socket.emit('change color', this.state.color)
  }

  testSocket = () => {


  }
  render() {
    return (
      <div className="App">
        <button onClick={this.testSocket}></button>
      </div>
    );
  }
}

export default App;
