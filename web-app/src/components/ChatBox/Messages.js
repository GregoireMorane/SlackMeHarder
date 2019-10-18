import React from 'react';
import { useMessages } from './services';
import './styles.css';

function Messages(props) {
  const [messages, createMessage, contentValue, setContentValue] = useMessages(
    props.match.params.id
  );

  const _createNewMessage = async e => {
    e.preventDefault();
    await createMessage();
    setContentValue('');
  };

  const _setCurrentMessageContent = e => {
    setContentValue(e.target.value);
  };

  return (
    <div className="container__chat">
      <div className="container__chat__messages">
        {messages &&
          messages.map(message => <p key={message.id}>{message.content}</p>)}
      </div>
      <div className="container__chat__sendBox">
        <form className="form__chat__sendbox" onSubmit={_createNewMessage}>
          <input
            className="input__chat__sendbox"
            placeholder="Envoyer un message"
            value={contentValue}
            onChange={_setCurrentMessageContent}
          />
          <button className="button__chat__sendbox" type="submit">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}

export default Messages;
