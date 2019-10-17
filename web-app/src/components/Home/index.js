import React from 'react';
import { useChannels } from './services';
import { Link } from 'react-router-dom';

import ChatBox from '../ChatBox';

import './styles.css';

function Home() {
  const channels = useChannels();
  return (
    <div className="container">
      <div className="container__channels">
        <p>channels</p>
        <ul>
          {channels.map(channel => (
            <li key={channel.name}>
              <Link to={`/channel/${channel.id}`}>{channel.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <ChatBox />
    </div>
  );
}

export default Home;
