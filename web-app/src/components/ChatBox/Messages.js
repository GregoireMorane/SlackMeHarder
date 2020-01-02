import React, { useRef } from 'react';
import { useMessages } from './services';
import {
  isUsernameAndHourNeedToBeDisplayed,
  formatHour,
} from '../../utils/displayUsernameAndHour';
import './styles.css';

function Messages(props) {
  const messagesListEnd = useRef();

  const {
    messages,
    createMessage,
    contentValue,
    setContentValue,
    scrollToBottom,
  } = useMessages(props.match.params.id, messagesListEnd);
  
  const _createNewMessage = async (e) => {
    e.preventDefault();
    await createMessage();
    setContentValue('');
    await scrollToBottom(messagesListEnd);
  };
  
  const _setCurrentMessageContent = e => {
    setContentValue(e.target.value);
  };
  
  return (
    <div className="container__chat">
      <div className="container__chat__messages">
        {messages &&
          messages.map((message, index) => (
            <div className="container__message" key={message.id}>
              {isUsernameAndHourNeedToBeDisplayed(
                index - 1,
                message,
                messages
              ) && (
                <div className="username__message">
                  <p className="username">{message.username}</p>
                  <p className="hour">{formatHour(message.updated_at)}</p>
                </div>
              )}
              <p className="content_message">{message.content}</p>
            </div>
          ))}
        <div ref={messagesListEnd}></div>
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
