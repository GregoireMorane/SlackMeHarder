import React from 'react';
import { useMessages } from './services';
import './styles.css';

function Messages(props) {
  const messages = useMessages(props.match.params.id);
  console.log('messages', messages);
  return (
    <div className="container__chat">
      <div className="container__chat--messages">
        <p>messages</p>
      </div>
      <div className="container__chat--sendBox">
        <p>input envoi message</p>
      </div>
    </div>
  );
}

export default Messages;
