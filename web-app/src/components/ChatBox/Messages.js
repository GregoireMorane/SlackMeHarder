import React, { useRef } from 'react';
import { useMessages } from './services';
import {
  isUsernameAndHourNeedToBeDisplayed,
  formatHour,
} from '../../utils/displayUsernameAndHour';
import './styles.css';

function Messages(props) {
  const messageContainerRef = useRef(null);

  const {
    messages,
    createMessage,
    contentValue,
    setContentValue,
  } = useMessages(props.match.params.id);
  
  const _createNewMessage = async (e, ref) => {
    e.preventDefault();
    await createMessage();
    setContentValue('');
    await ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  
  const _setCurrentMessageContent = e => {
    setContentValue(e.target.value);
  };
  
  return (
    <div className="container__chat">
      <div className="container__chat__messages">
        {messages &&
          messages.map((message, index) => (
            <div ref={messageContainerRef} className="container__message" key={message.id}>
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
      </div>
      <div className="container__chat__sendBox">
        <form className="form__chat__sendbox" onSubmit={(e) => _createNewMessage(e, messageContainerRef)}>
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
