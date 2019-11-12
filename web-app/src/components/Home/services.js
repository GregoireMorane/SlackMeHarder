import { useState, useEffect } from 'react';
// import socketIOClient from 'socket.io-client';

import { fetchChannels, createChannel } from '../../data/services/api';

export const useChannels = () => {
  const [channels, setChannels] = useState([]);

  // const endpoint = `${process.env.REACT_APP_API_BASE_URL}`;
  // const socket = socketIOClient(endpoint);

  // socket.emit('connection');

  const [
    shouldPromptModalCreateChannel,
    setShouldPromptModalCreateChannel,
  ] = useState(false);

  const [currentNewChannelName, setCurrentNewChannelName] = useState('');

  useEffect(() => {
    _fetchChannels();
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

  return [
    channels,
    shouldPromptModalCreateChannel,
    sShouldPromptModalCreateChannel,
    createNewChannel,
    currentNewChannelName,
    setCurrentNewChannelName,
  ];
};
