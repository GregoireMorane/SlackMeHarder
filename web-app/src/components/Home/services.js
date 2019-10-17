import { useState, useEffect } from 'react';
import { fetchChannels } from '../../data/services/api';

export const useChannels = () => {
  const [channels, setChannels] = useState([]);
  const [
    shouldPromptModalCreateChannel,
    setShouldPromptModalCreateChannel,
  ] = useState(false);

  useEffect(() => {
    const _fetchChannels = async () => {
      setChannels(await fetchChannels());
    };

    _fetchChannels();
  }, []);

  const sShouldPromptModalCreateChannel = () => {
    setShouldPromptModalCreateChannel(true);
  };

  return [
    channels,
    shouldPromptModalCreateChannel,
    sShouldPromptModalCreateChannel,
  ];
};
