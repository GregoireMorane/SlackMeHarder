import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import { fetchChannels, createChannel } from '../../data/services/api';

const endpoint = `${process.env.REACT_APP_API_BASE_URL}`;

export const useChannels = () => {
  const [channels, setChannels] = useState([]);

  const [
    shouldPromptModalCreateChannel,
    setShouldPromptModalCreateChannel,
  ] = useState(false);

  const [currentNewChannelName, setCurrentNewChannelName] = useState('');

  useEffect(() => {
    const socket = socketIOClient(endpoint);
    _fetchChannels();
    getLiveChannels(socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  const _fetchChannels = async () => {
    setChannels(await fetchChannels());
  };

  const sShouldPromptModalCreateChannel = () => {
    setShouldPromptModalCreateChannel(!shouldPromptModalCreateChannel);
  };

  const createNewChannel = async () => {
    await createChannel(currentNewChannelName);
    setShouldPromptModalCreateChannel(!shouldPromptModalCreateChannel);
    await _fetchChannels();
  };

  const getLiveChannels = socket => {
    socket.on('sendChannelToClient', data => {
      _fetchChannels();
      console.log('channel from serv', data);
    });
  };

  return [
    channels,
    shouldPromptModalCreateChannel,
    sShouldPromptModalCreateChannel,
    createNewChannel,
    currentNewChannelName,
    setCurrentNewChannelName,
  ];
};
