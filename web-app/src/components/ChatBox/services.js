import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

// import { scrollToBottomOfElement } from '../../utils/animations';

import { fetchMessages, postMessages } from '../../data/services/api';

export const useMessages = id => {
  console.log('useMessages');
  let channelId = id;

  const [messages, setMessages] = useState([]);
  const [contentValue, setContentValue] = useState('');

  const createMessage = async () => {
    await postMessages(contentValue, channelId);
    await _fetchMessages(channelId);
  };

  const _fetchMessages = async channelId => {
    console.log('_fetcheMessages');
    setMessages(await fetchMessages(channelId));
    // scrollToBottomOfElement('.container__chat__messages');
  };

  const _getLiveMessages = (socket, channelId) => {
    socket.on('sendMessageToClient', data => {
      _fetchMessages(channelId);
      console.log('message from serv', data);
      // scrollToBottomOfElement('.container__chat__messages');
    });
  };

  useEffect(() => {
    console.log('useEffect');
    const socket = socketIOClient('');
    _fetchMessages(channelId);
    _getLiveMessages(socket, channelId);
    return () => {
      socket.disconnect();
    };
  }, [id]);

  return { messages, createMessage, contentValue, setContentValue };
};
