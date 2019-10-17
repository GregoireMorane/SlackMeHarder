import React from 'react';
import { useChannels } from './services';
import { Link } from 'react-router-dom';

import ChatBox from '../ChatBox';

import './styles.css';

function Home() {
  const [
    channels,
    shouldPromptModalCreateChannel,
    sShouldPromptModalCreateChannel,
  ] = useChannels();
  return (
    <div className="container">
      <div className="container__channels">
        <div className="container__channels__containerTitle">
          <p className="container__channels__title">channels</p>
          <button
            onClick={sShouldPromptModalCreateChannel}
            className="container__channels__button"
          >
            <span className="container__channels__button__icon">+</span>
          </button>
        </div>
        <ul className="container__channels__list">
          {channels.map(channel => (
            <li key={channel.name}>
              <Link
                to={`/channel/${channel.id}`}
                className="container__channels__list__label"
              >
                # {channel.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <ChatBox />
      {shouldPromptModalCreateChannel === true ? (
        <div className="container__modalCreateChannel">
          <input placeholder="Nom du channel" />
        </div>
      ) : null}
    </div>
  );
}

export default Home;
