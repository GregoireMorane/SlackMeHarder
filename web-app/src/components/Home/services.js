import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import { fetchChannels, createChannel, whoAmI } from '../../data/services/api';

const endpoint = `${process.env.REACT_APP_API_BASE_URL}`;

export const useChannels = () => {
  const [channels, setChannels] = useState([]);

  const [
    shouldPromptModalCreateChannel,
    setShouldPromptModalCreateChannel,
  ] = useState(false);

  const [currentNewChannelName, setCurrentNewChannelName] = useState('');

  const [shouldTriggerAuth, setShouldTriggerAuth] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const socket = socketIOClient(endpoint);
    const checkAuthAndFetchChannels = async () => {
      await _checkAuth();
      _fetchChannels();
    }
    checkAuthAndFetchChannels();
    getLiveChannels(socket);
    return () => {
      socket.disconnect();
    };
  }, [shouldTriggerAuth]);

  const _checkAuth = async () => {
    await whoAmI()
      .then(function(response) {
        setUser(response);
        setShouldTriggerAuth(false);
      })
      .catch(function(error) {
        if (error.response.status === 404) {
          setShouldTriggerAuth(true);
        }
      });
  };

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
    shouldTriggerAuth,
    setShouldTriggerAuth,
  ];
};
