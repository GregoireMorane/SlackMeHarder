const socketIO = require('socket.io');

const getWebSocket = server => {
  return socketIO(server);
};

const useSocket = socket => (req, res, next) => {
  req.socket = socket;
  next();
};

const notifyClientOfNewMessage = (socket, message) => {
  socket.emit('sendMessageToClient', message);
  console.log('message : ', message);
};

const notifyClienOfNewChannel = (socket, channel) => {
  socket.emit('sendChannelToClient', channel);
};

module.exports = {
  getWebSocket,
  useSocket,
  notifyClientOfNewMessage,
  notifyClienOfNewChannel,
};
