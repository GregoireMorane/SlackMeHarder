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
    updateMessage,
    isEditMode,
    setIsEditMode,
    messageIdToUpdate,
    setMessageIdToUpdate,
    user,
    updateContentValue,
    setUpdateContentValue,
  } = useMessages(props.match.params.id, messagesListEnd);
  
  const _createNewMessage = async (e) => {
    e.preventDefault();
    await createMessage();
    setContentValue('');
    await scrollToBottom(messagesListEnd, true);
  };

  const getEditMode = (message) => {
    setUpdateContentValue(message.content);
    setIsEditMode(true);
    setMessageIdToUpdate(message.id);
  }
  
  const _updateMyMessage = async (message, e) => {
    e.preventDefault();
    await updateMessage(message)
    setIsEditMode(false);    
  }
  
  const _setCurrentMessageContent = e => {
    setContentValue(e.target.value);
  };

  const _setUpdateContentValue = e => {
    setUpdateContentValue(e.target.value)
  }
  
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

              {user && user.id === message.userId && isEditMode && messageIdToUpdate === message.id ? (
                <form onSubmit={(e) => _updateMyMessage(message, e)}>
                  <input 
                    className=""
                    value={updateContentValue}
                    onChange={_setUpdateContentValue}
                  />
                  <button type="submit">Ok</button>
                </form>
              ) : (
                <p className="content_message">{message.content}</p>
              )}

              {user && user.id === message.userId && 
                <div className="update__delete__container">
                  <button className="update__message" onClick={() => getEditMode(message)}>Modifier</button>
                </div>
              }
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
