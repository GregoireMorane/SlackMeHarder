import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import { 
  fetchMessages,
  postMessages,
  putMessage,
  whoAmI,
} from '../../data/services/api';

export const useMessages = (id, ref) => {
  let channelId = id;
  const [messages, setMessages] = useState([]);
  const [contentValue, setContentValue] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [messageIdToUpdate, setMessageIdToUpdate] = useState(null);
  const [user, setUser] = useState(null);
  const [updateContentValue, setUpdateContentValue] = useState('');

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
      console.log('message created from serv', data);
    });
    socket.on('messageHasBeenUpdated', async data => {
      await _fetchMessages(channelId);
      console.log('message updated from serv', data);
    })
  };

  const scrollToBottom = (refToScroll, isSmoothly) => {
    const options = {
      behavior: 'smooth',
      block: 'start',
    };
    isSmoothly ? refToScroll.current.scrollIntoView(options) : refToScroll.current.scrollIntoView();
  }

  const updateMessage = async (message) => {
    await putMessage({...message, content: updateContentValue});
  }

  const _getUser = async () => {
    const user = await whoAmI()
    setUser(user);
  }

  useEffect(() => {
    const _getMessagesAndScroll = async () => {
      await _fetchMessages(channelId);
      scrollToBottom(ref, false);
    }
    const socket = socketIOClient('');
    _getMessagesAndScroll()
    _getLiveMessages(socket, channelId);
    _getUser();
    return () => {
      socket.disconnect();
    };
  }, [id]);

  return { 
    messages,
    createMessage,
    contentValue,
    setContentValue,
    scrollToBottom,
    updateMessage,
    isEditMode,
    setIsEditMode,
    messageIdToUpdate,
    setMessageIdToUpdate,
    user,
    updateContentValue,
    setUpdateContentValue,
  };
};
