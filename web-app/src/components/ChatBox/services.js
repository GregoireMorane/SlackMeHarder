import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import { fetchMessages, postMessages } from '../../data/services/api';

const endpoint = `${process.env.REACT_APP_API_BASE_URL}`;

export const useMessages = (id, ref) => {
  let channelId = id;
  const [messages, setMessages] = useState([]);
  const [contentValue, setContentValue] = useState('');

  const createMessage = async () => {
    await postMessages(contentValue, channelId);
    await _fetchMessages(channelId);
  };

  const _fetchMessages = async channelId => {
    setMessages(await fetchMessages(channelId));
  };
  
  const _getLiveMessages = (socket, channelId) => {
    socket.on('sendMessageToClient', async data => {
      await _fetchMessages(channelId);
      scrollToBottom(ref, true)
      console.log('message from serv', data);
    });
  };

  const scrollToBottom = (refToScroll, isSmoothly) => {
    const options = {
      behavior: 'smooth',
      block: 'start',
    };
    isSmoothly ? refToScroll.current.scrollIntoView(options) : refToScroll.current.scrollIntoView();
  }

  useEffect(() => {
    const socket = socketIOClient(endpoint);
    const _getMessagesAndScroll = async () => {
      await _fetchMessages(channelId);
      scrollToBottom(ref, false);
    }
    _getMessagesAndScroll()
    _getLiveMessages(socket, channelId);
    return () => {
      socket.disconnect();
    };
  }, [id]);

  return { messages, createMessage, contentValue, setContentValue, scrollToBottom };
};
