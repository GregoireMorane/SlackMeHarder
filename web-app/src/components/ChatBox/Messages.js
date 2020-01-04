import React, { useRef } from 'react';
import { useMessages } from './services';
import {
  isUsernameAndHourNeedToBeDisplayed,
  formatHour,
} from '../../utils/displayUsernameAndHour';
import './styles.css';
import blueGreenPencil from './../../assets/icons/pencilBlueGreen.png';
import greenCheck from './../../assets/icons/greenCheck.png';
import redTrash from './../../assets/icons/redTrashIcon.png';

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
    deleteMessage,
  } = useMessages(props.match.params.id, messagesListEnd);
  
  const _createNewMessage = async (e) => {
    e.preventDefault();
    await createMessage();
    setContentValue('');
    await scrollToBottom(messagesListEnd, true);
  };

  const _updateMyMessage = async (message) => {
    setUpdateContentValue(message.content);
    setIsEditMode(!isEditMode);
    setMessageIdToUpdate(message.id);

    if(isEditMode && messageIdToUpdate !== message.id) {
      setIsEditMode(true);
    }

    if(isEditMode && messageIdToUpdate === message.id) {
      await updateMessage(message)
      setIsEditMode(false);
    }
  }
  
  const _setCurrentMessageContent = e => {
    setContentValue(e.target.value);
  };

  const _setUpdateContentValue = e => {
    setUpdateContentValue(e.target.value)
  }
  
  const getIcon = (messageId) => {
    return isEditMode ? messageId === messageIdToUpdate ? greenCheck : blueGreenPencil : blueGreenPencil;
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
              <div className="content__options__message">
                <div className="content__message">
                  {user && user.id === message.userId && isEditMode && messageIdToUpdate === message.id ? (
                    <input className="input__message" value={updateContentValue} onChange={_setUpdateContentValue}/>
                  ) : (
                    <p className="text_message">{message.content}</p>
                  )}
                </div>

                {user && user.id === message.userId && 
                  <div className="update__delete__container">
                    <input 
                      className="update__message" 
                      type="image"
                      src={getIcon(message.id)}
                      onClick={() => _updateMyMessage(message)}
                    />
                    <input
                      className="delete__message"
                      type="image"
                      src={redTrash}
                      onClick={() => deleteMessage(message.id)}
                    />
                  </div>
                }
              </div>

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
