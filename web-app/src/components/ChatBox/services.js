import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import { fetchMessages, postMessages } from '../../data/services/api';

export const useMessages = id => {
  const endpoint = `${process.env.REACT_APP_API_BASE_URL}`;
  const socket = socketIOClient(endpoint);

  const [messages, setMessages] = useState([]);

  const createMessage = async content => {
    socket.emit('getMessageFromClient', content);
    const message = await postMessages(content, id);
    addMessage(message);
  };

  const addMessage = message => {
    const messagesUpdated = [...messages, message];
    setMessages(messagesUpdated);
  };

  useEffect(() => {
    const _fetchMessages = async id => {
      setMessages(await fetchMessages(id));
    };

    _fetchMessages(id);
  }, [id]);

  socket.on('sendMessagesToclient', data => {
    console.log('message from server', data);
  });

  return [messages, createMessage, addMessage];
};
