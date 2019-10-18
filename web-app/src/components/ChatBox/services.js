import { useState, useEffect } from 'react';
import { fetchMessages, postMessages } from '../../data/services/api';

export const useMessages = id => {
  const [messages, setMessages] = useState([]);

  const createMessage = async (content) => {
    const message = await postMessages(content, id);
    await addMessage(message);
  }

  // add message front view and run again the fetch to be sure that the message has been created
  const addMessage = (message) => {
    const messagesUpdated = [...messages, message]
    setMessages(messagesUpdated);
  }

  useEffect(() => {
    const _fetchMessages = async id => {
      setMessages(await fetchMessages(id));
    };

    _fetchMessages(id);
  }, [id]);

  return [messages, createMessage, addMessage];
};
