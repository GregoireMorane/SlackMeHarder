import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import { scrollToBottomOfElement } from '../../utils/animations';

import { fetchMessages, postMessages } from '../../data/services/api';

const endpoint = `${process.env.REACT_APP_API_BASE_URL}`;

export const useMessages = id => {
  let channelId = id;

  const [messages, setMessages] = useState([]);
  const [contentValue, setContentValue] = useState('');

  const createMessage = async () => {
    const message = await postMessages(contentValue, channelId);

    // socket.emit('getMessageFromClient', contentValue);

    await _fetchMessages(channelId);
    // run again the fetch to be sure that the message has been created
    await addMessage(message);
    scrollToBottomOfElement('.container__chat__messages');
  };

  const addMessage = message => {
    const messagesUpdated = [...messages, message];
    setMessages(messagesUpdated);
  };

  const _fetchMessages = async channelId => {
    setMessages(await fetchMessages(channelId));
    scrollToBottomOfElement('.container__chat__messages');
  };

  const _getLiveMessages = (socket, channelId) => {
    socket.on('sendMessageToClient', data => {
      _fetchMessages(channelId);
      console.log('socket on');
      console.log('message from serv', data);
      scrollToBottomOfElement('.container__chat__messages');
    });
  };

  useEffect(() => {
    const socket = socketIOClient(endpoint);
    _fetchMessages(channelId);
    _getLiveMessages(socket, channelId);
    return () => {
      socket.disconnect();
    };
  }, [id]);

  return [messages, createMessage, contentValue, setContentValue];
};
