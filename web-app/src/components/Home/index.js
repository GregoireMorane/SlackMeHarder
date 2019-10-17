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
    createNewChannel,
    currentNewChannelName,
    setCurrentNewChannelName,
  ] = useChannels();

  const _createNewChannel = e => {
    e.preventDefault();
    createNewChannel();
  };

  const _setCurrentNewChannelName = e => {
    setCurrentNewChannelName(e.target.value);
  };

  return (
    <div className="container">
      <div className="container__channels">
        <div className="container__channels__containerTitle">
          <p className="container__channels__title">Channels</p>
          <button
            onClick={sShouldPromptModalCreateChannel}
            className="container__channels__button"
          >
            <span className="container__channels__button__icon">+</span>
          </button>
        </div>
        <ul className="container__channels__list">
          {channels.map(channel => (
            <Link
              key={channel.name}
              to={`/channel/${channel.id}`}
              className="container__channels__list__element"
            >
              <li className="container__channels__list__label">
                # {channel.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <ChatBox />
      {shouldPromptModalCreateChannel === true ? (
        <div className="container__modalCreateChannel">
          <div className="container__modalCreateChannel__contentContainer">
            <form onSubmit={_createNewChannel}>
              <input
                placeholder="Nom du channel"
                value={currentNewChannelName}
                onChange={_setCurrentNewChannelName}
              />
              <button type="submit">Valider</button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Home;
