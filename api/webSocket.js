// const socketIO = require('socket.io');

// const getWebSocket = server => {
//   return socketIO(server);
// };

const useSocket = socket => (req, res, next) => {
  req.socket = socket;
  next();
};

const notifyClientOfNewMessage = (socket, message) => {
  socket.emit('sendMessageToClient', message);
};

const notifyClienOfNewChannel = (socket, channel) => {
  socket.emit('sendChannelToClient', channel);
};

const notifyClientMessageHasBeenUpdated = (socket, message) => {
  socket.emit('messageHasBeenUpdated', message)
}

module.exports = {
  // getWebSocket,
  useSocket,
  notifyClientOfNewMessage,
  notifyClienOfNewChannel,
  notifyClientMessageHasBeenUpdated,
};
