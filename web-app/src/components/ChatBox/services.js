import { useState, useEffect } from 'react';
import { fetchMessages, postMessages } from '../../data/services/api';

export const useMessages = id => {
  const [messages, setMessages] = useState([]);
  const [contentValue, setContentValue] = useState('');

  const createMessage = async () => {
    const message = await postMessages(contentValue, id);
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

  return [messages, createMessage, contentValue, setContentValue];
};
