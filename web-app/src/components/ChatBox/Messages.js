import React from 'react';
import { useMessages } from './services';
import './styles.css';

function Messages(props) {
  const [messages, createMessage] = useMessages(props.match.params.id);

  const onSubmit = async e => {
    // use an onChange() event and add a new state for de value
    e.preventDefault();
    const formData = new FormData(e.target);
    const content = formData.get('content')
    await createMessage(content);
  }

  return (
    <div className="container__chat">
      <div className="container__chat__messages">
        {messages && messages.map(message => (
          <p key={message.id}>{message.content}</p>
        ))}
      </div>
      <div className="container__chat__sendBox">
        <form className="form__chat__sendbox" onSubmit={e => onSubmit(e)}>
          <input className="input__chat__sendbox" placeholder="Envoyer un message" name="content"/>
          <button className="button__chat__sendbox" type="submit">Envoyer</button>        
        </form>
      </div>
    </div>
  );
}

export default Messages;
