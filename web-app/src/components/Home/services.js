import { useState, useEffect } from 'react';
import { fetchChannels } from '../../data/services/api';

export const useChannels = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const _fetchChannels = async () => {
      setChannels(await fetchChannels());
    };

    _fetchChannels();
  }, []);

  return channels;
};
