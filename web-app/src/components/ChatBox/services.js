import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import { fetchMessages, postMessages } from '../../data/services/api';

export const useMessages = id => {
  const endpoint = `${process.env.REACT_APP_API_BASE_URL}`;
  const socket = socketIOClient(endpoint);

  const [messages, setMessages] = useState([]);
  const [contentValue, setContentValue] = useState('');

  const createMessage = async () => {
    const message = await postMessages(contentValue, id);

    socket.emit('getMessageFromClient', contentValue);

    await _fetchMessages(id);
    // run again the fetch to be sure that the message has been created
    await addMessage(message);
  };

  const addMessage = message => {
    const messagesUpdated = [...messages, message];
    setMessages(messagesUpdated);
  };

  const _fetchMessages = async id => {
    setMessages(await fetchMessages(id));
  };

  useEffect(() => {
    _fetchMessages(id);
  }, [id]);

  console.log('before on');
  socket.on('sendMessagesToclient', data => {
    // _fetchMessages(id);
    console.log('message from serv', data);
  });

  return [messages, createMessage, contentValue, setContentValue];
};
