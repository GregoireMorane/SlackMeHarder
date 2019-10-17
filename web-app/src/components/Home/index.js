import React from 'react';
import './styles.css';

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="container__channels">
          <p>channels</p>
        </div>
        <div className="container__chat">
          <div className="container__chat--messages">
            <p>messages</p>
          </div>
          <div className="container__chat--sendBox">
            <p>input envoi message</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
