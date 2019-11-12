import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import { fetchMessages, postMessages } from '../../data/services/api';

const endpoint = `${process.env.REACT_APP_API_BASE_URL}`;
const socket = socketIOClient(endpoint);

export const useMessages = id => {
  let channelId = id;

  const [messages, setMessages] = useState([]);
  const [contentValue, setContentValue] = useState('');

  const createMessage = async () => {
    const message = await postMessages(contentValue, channelId);

    socket.emit('getMessageFromClient', contentValue);

    await _fetchMessages(channelId);
    // run again the fetch to be sure that the message has been created
    await addMessage(message);
  };

  const addMessage = message => {
    const messagesUpdated = [...messages, message];
    setMessages(messagesUpdated);
  };

  const _fetchMessages = async channelId => {
    setMessages(await fetchMessages(channelId));
  };

  const _getLiveMessages = (socket, channelId) => {
    socket.on('sendMessagesToClient', data => {
      _fetchMessages(channelId);
      console.log('message from serv', data);
    });
  };

  useEffect(() => {
    _fetchMessages(channelId);
    _getLiveMessages(socket, channelId);
    return () => {
      socket.disconnect();
    };
  }, [id]);

  return [messages, createMessage, contentValue, setContentValue];
};
