import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './styles.css';

import Messages from './Messages';
import NoChatBoxScreen from './NoChatBoxScreen';

function ChatBox() {
  return (
    <div className="container__chat">
      <Switch>
        <Route exact path="/" component={NoChatBoxScreen} />
        <Route exact path="/channel/:id" component={Messages} />
      </Switch>
    </div>
  );
}

export default ChatBox;
