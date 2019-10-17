import { useState, useEffect } from 'react';
import { fetchChannels, createChannel } from '../../data/services/api';

export const useChannels = () => {
  const [channels, setChannels] = useState([]);

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
