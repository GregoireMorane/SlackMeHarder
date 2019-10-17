import React from 'react';
import { useChannels } from './behavior';
import './styles.css';

function Home() {
  const channels = useChannels();
  console.log('channels in Home', channels);
  return (
    <div className="container">
      <div className="container__channels">
        <p>channels</p>
        {channels.map(channel => (
          <p key={channel.name}>{channel.name}</p>
        ))}
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

export default Home;
