import { useState, useEffect } from 'react';
import { fetchMessages } from '../../data/services/api';

export const useMessages = id => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const _fetchMessages = async id => {
      setMessages(await fetchMessages(id));
    };

    _fetchMessages(id);
  }, [id]);

  return messages;
};
